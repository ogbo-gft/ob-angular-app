import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Column types supported for a column
export type ColumnType = 'string' | 'number' | 'boolean' | 'date' | 'status' | 'any';

// Special status enum used by one of the columns
export enum Status {
  Open = 'Open',
  InReview = 'In Review',
  Approved = 'Approved'
}

// Generic column metadata structure
export interface ColumnMetadata {
  // `name` matches the property name on the row objects
  name: string;
  // `displayString` is the header label shown in the UI
  displayString: string;
  // `type` describes the type of data in the column
  type: ColumnType;
}

// Generic table data structure
export interface TableData<T> {
  columns: ColumnMetadata[];
  rows: T[];
}


export interface Element {
  id: number;
  name: string;
  age: number;
  status: Status;
}


const ELEMENT_DATA: Element[] = [
  { id: 1, name: 'Bob', age: 25, status: Status.Open },
  { id: 2, name: 'Zoé', age: 30, status: Status.InReview },
  { id: 3, name: 'Charlie', age: 35, status: Status.Approved },
  { id: 4, name: 'David', age: 40, status: Status.Open },
  { id: 5, name: 'Alice', age: 18, status: Status.InReview },
];

// Example TableData for Element
export const ELEMENT_TABLE_DATA: TableData<Element> = {
  columns: [
    { name: 'id', displayString: 'ID', type: 'number' },
    { name: 'name', displayString: 'Name', type: 'string' },
    { name: 'age', displayString: 'Age', type: 'number' },
    { name: 'status', displayString: 'Status', type: 'status' }
  ],
  rows: ELEMENT_DATA
};

@Component({
  selector: 'app-table-component',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatIconModule],
  templateUrl: './table-component.html',
  styleUrls: ['./table-component.scss'],
})
export class TableComponent implements OnInit {
  // derive columns/displayedColumns from the metadata
  columns = ELEMENT_TABLE_DATA.columns;
  displayedColumns: string[] = this.columns.map(c => c.name);
  dataSource = new MatTableDataSource<Element>(ELEMENT_TABLE_DATA.rows);

  // generic filter values keyed by column name
  filterValues: Record<string, string> = {};

  // options for the status dropdown
  statusOptions: string[] = Object.values(Status);

  ngOnInit() {
    // initialize empty filter values for each column
    this.columns.forEach(c => this.filterValues[c.name] = '');
    this.dataSource.filterPredicate = this.createFilter();
  }

  applyFilter(event: Event, columnName: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValues[columnName] = filterValue.trim();
    // MatTableDataSource uses a single string filter; encode structured filters as JSON
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  clearFilter(columnName: string) {
    this.filterValues[columnName] = '';
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  applySelectFilter(value: string, columnName: string) {
    // value is already the selected string (or empty for 'All')
    this.filterValues[columnName] = (value || '').trim();
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  clearAllFilters() {
    // Reset all filter values
    this.columns.forEach(c => this.filterValues[c.name] = '');
    this.dataSource.filter = '';
  }

  createFilter() {
    const columns = this.columns;
    return (data: any, filter: string): boolean => {
      const searchTerms: Record<string, string> = JSON.parse(filter || '{}');
      return columns.every(col => {
        const term = (searchTerms[col.name] || '').trim();
        if (!term) return true;
        const cellValue = data[col.name];
        if (cellValue === null || cellValue === undefined) return false;

        switch (col.type) {
          case 'number': {
            const t = term;
            // support simple numeric operators: >, >=, <, <=, =
            const m = t.match(/^([<>]=?|=)\s*(-?\d+(?:\.\d+)?)/);
            if (m) {
              const op = m[1];
              const num = parseFloat(m[2]);
              const val = Number(cellValue);
              if (isNaN(val)) return false;
              if (op === '>') return val > num;
              if (op === '>=') return val >= num;
              if (op === '<') return val < num;
              if (op === '<=') return val <= num;
              if (op === '=') return val === num;
            }
            // fallback substring match
            return String(cellValue).toLowerCase().includes(t.toLowerCase());
          }
          case 'date': {
            const t = term;
            const m = t.match(/^([<>]=?|=)\s*(.+)/);
            const cellDate = new Date(cellValue);
            if (m) {
              const op = m[1];
              const cmp = new Date(m[2]);
              if (!isNaN(cellDate.getTime()) && !isNaN(cmp.getTime())) {
                if (op === '>') return cellDate > cmp;
                if (op === '>=') return cellDate >= cmp;
                if (op === '<') return cellDate < cmp;
                if (op === '<=') return cellDate <= cmp;
                if (op === '=') return cellDate.getTime() === cmp.getTime();
              }
            }
            return String(cellValue).toLowerCase().includes(t.toLowerCase());
          }
          case 'boolean': {
            const t = term.toLowerCase();
            if (t === 'true' || t === 'false') return String(Boolean(cellValue)) === t;
            return String(cellValue).toLowerCase().includes(t);
          }
          default:
            return String(cellValue).toLowerCase().includes(term.toLowerCase());
        }
      });
    };
  }

  // Formatting helper for template cells
  formatCell(element: any, column: ColumnMetadata): string {
    const val = element[column.name];
    if (val === null || val === undefined) return '';
    switch (column.type) {
      case 'date': {
        const d = new Date(val);
        return isNaN(d.getTime()) ? String(val) : d.toLocaleDateString();
      }
      case 'number':
        return String(val);
      case 'boolean':
        return String(Boolean(val));
      default:
        return String(val);
    }
  }
}
