export const products = [
  {
    id: 1,
    name: 'Sombreros',
    price: 25000,
    category: 'Sombreros',
    imageUrl:
      'https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    name: 'Buzos',
    price: 95000,
    category: 'Buzos',
    imageUrl: 'https://leclee.com.co/cdn/shop/files/2416003551.jpg?v=1720212548',
  },
  {
    id: 3,
    name: 'Bikini',
    price: 45000,
    category: 'Ropa de Baño',
    imageUrl:
      'https://fitplanetco.com/cdn/shop/articles/BIKINI_ECO_Y_SOSTENIBLE_HECHO_EN_ESPANA_MADE_IN_SPAIN_FITPLANET-146.jpg?v=1716784697&width=1200',
  },
  {
    id: 4,
    name: 'Pantaloneta',
    price: 40000,
    category: 'Ropa de Baño',
    imageUrl:
      'https://marcacedro.com/cdn/shop/products/pantaloneta_de_ba_o_para_hombre_de_la_marca_cedro_color_azul_claro_hecha_con_procesos_sostenibles.jpg?v=1733332282&width=700',
  },
  {
    id: 5,
    name: 'Gorras',
    price: 22000,
    category: 'Gorras',
    imageUrl: 'https://cubitt.com.co/cdn/shop/files/CTCAP-1E.webp?v=1753078668&width=600',
  },
  {
    id: 6,
    name: 'Buzo Black"',
    price: 70000,
    category: 'Buzos',
    imageUrl: 'https://vansco.vteximg.com.br/arquivos/ids/340280-1200-1200/VN0A7TJPBLK-1.jpg?v=638545982599500000',
  },
  {
    id: 7,
    name: 'Bikini "Tropical"',
    price: 50000,
    category: 'Ropa de Baño',
    imageUrl: 'https://www.gabriola.es/1095-thickbox_default/bikini-estampado-floral-volante-mogan.jpg',
  },
  {
    id: 8,
    name: 'Pantaloneta "Surfer"',
    price: 42000,
    category: 'Ropa de Baño',
    imageUrl: 'https://leonisa.co/cdn/shop/files/505040_022_1200X1500_1_900x.jpg?v=1743804015',
  },
];

const featuredProductIds = new Set([1, 2, 3, 4]);

export const featuredProducts = products.filter((product) => featuredProductIds.has(product.id));

const productById = new Map(products.map((product) => [String(product.id), product]));

export const getProductById = (id) => productById.get(String(id));
