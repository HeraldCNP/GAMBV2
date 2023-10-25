import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menuItems = [
    {
      label: 'Plantillas',
      icon: 'fas fa-file',
      docs: [
        {
          label: 'Modelos',
          url: '/doc/modelos/index'
        },
        {
          label: 'Documentos',
          url: '/doc/documentos/index'
        },
      ]
    },
    {
      label: 'Normativas',
      icon: 'fas fa-file-contract',
      docs: [
        {
          label: 'Tipos',
          url: '/doc/normativas/tipos/index'
        },

        {
          label: 'Documentos',
          url: '/doc/normativas/doc/index'
        },
      ]
    },
  ];
}
