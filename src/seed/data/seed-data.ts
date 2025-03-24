interface SeedRol {
    type: string;
}

interface SeedUser {
    email: string;
    password: string;
    name: string;
    provider: string; //email o google
}

interface SeedCategory {
    name: string;
}

interface SeedColor {
    name: string;
    codigo_hexadecimal: string;
}

interface SeedSubcategory{
    name: string;
    categoryName: string;
}

interface SeedSize{
    name: string;
    categoryName: string;
}

interface SeedProduct {
    description: string;
    images: string[];
    price: number;
    slug: string;
    title: string;
    gender: string;
    
}

interface SeedData {
    roles: SeedRol[];
    users: SeedUser[];
    categories: SeedCategory[];
    subcategories: SeedSubcategory[];
    sizes: SeedSize[];
    colors: SeedColor[];
    products: SeedProduct[];
}

export const initialData: SeedData = {
    roles: [
        {type: "user"},
        {type: "admin"},
    ],
    users: [
        {
            email: "user1@example.com",
            password: "password123",
            name: "Juan Pérez",
            provider: "email",
        },
        {
            email: "test01@gmail.com",
            password: "Abc123",
            name: "Juan Pérez",
            provider: "email",
        },
        {
            email: "user2@example.com",
            password: "password123",
            name: "María Gómez",
            provider: "google",
        },
        {
            email: "user3@example.com",
            password: "password123",
            name: "Carlos Rodríguez",
            provider: "email",
        },
        {
            email: "user4@example.com",
            password: "password123",
            name: "Ana López",
            provider: "google",
        },
        {
            email: "user5@example.com",
            password: "password123",
            name: "Sofía Fernández",
            provider: "email",
        },
        {
            email: "admin@example.com",
            password: "adminpass",
            name: "Super Admin",
            provider: "email",
        },
    ],
    categories: [
        {
            name: "ropa"
        },
        {
            name: "accesorios"
        },
        {
            name: "calzados"
        },
        {
            name: "otros"
        }
    ],
    subcategories: [
        {
            name: "remeras",
            categoryName: "ropa",
        },
        {
            name: "pantalones",
            categoryName: "ropa",
        },
        {
            name: "shorts",
            categoryName: "ropa",
        },
        {
            name: "vestidos",
            categoryName: "ropa",
        },
        {
            name: "camisetas",
            categoryName: "ropa",
        },
        {
            name: "camperas",
            categoryName: "ropa",
        },
        {
            name: "zapatos",
            categoryName: "calzados",
        },
        {
            name: "zapatillas",
            categoryName: "calzados",
        },
        {
            name: "ojotas",
            categoryName: "calzados",
        },
        {
            name: "botines",
            categoryName: "calzados",
        },
        {
            name: "gorras",
            categoryName: "accesorios",
        },
        {
            name: "bufandas",
            categoryName: "accesorios",
        },
        {
            name: "carteras",
            categoryName: "accesorios",
        },
    ],
    sizes: [
        {
            name: "XS",
            categoryName: "ROPA",
        },
        {
            name: "S",
            categoryName: "ROPA",
        },
        {
            name: "M",
            categoryName: "ROPA",
        },
        {
            name: "L",
            categoryName: "ROPA",
        },
        {
            name: "XL",
            categoryName: "ROPA",
        },
        {
            name: "29",
            categoryName: "CALZADOS",
        },
        {
            name: "30",
            categoryName: "CALZADOS",
        },
        {
            name: "31",
            categoryName: "CALZADOS",
        },
        {
            name: "32",
            categoryName: "CALZADOS",
        },
        {
            name: "33",
            categoryName: "CALZADOS",
        },
        {
            name: "34",
            categoryName: "CALZADOS",
        },
        {
            name: "35",
            categoryName: "CALZADOS",
        },
        {
            name: "36",
            categoryName: "CALZADOS",
        },
        {
            name: "37",
            categoryName: "CALZADOS",
        },
        {
            name: "38",
            categoryName: "CALZADOS",
        },
        {
            name: "39",
            categoryName: "CALZADOS",
        },
        {
            name: "40",
            categoryName: "CALZADOS",
        },
        {
            name: "41",
            categoryName: "CALZADOS",
        },
        {
            name: "42",
            categoryName: "CALZADOS",
        },
        {
            name: "43",
            categoryName: "CALZADOS",
        },
        {
            name: "44",
            categoryName: "CALZADOS",
        },
        {
            name: "pequeño",
            categoryName: "ACCESORIOS",
        },
        {
            name: "mediano",
            categoryName: "ACCESORIOS",
        },
        {
            name: "grande",
            categoryName: "ACCESORIOS",
        },
    ],
    colors: [
        { name: "Rojo", codigo_hexadecimal: "FF0000" },
        { name: "Verde", codigo_hexadecimal: "00FF00" },
        { name: "Azul", codigo_hexadecimal: "0000FF" },
        { name: "Amarillo", codigo_hexadecimal: "FFFF00" },
        { name: "Naranja", codigo_hexadecimal: "FFA500" },
        { name: "Morado", codigo_hexadecimal: "800080" },
        { name: "Rosa", codigo_hexadecimal: "FFC0CB" },
        { name: "Marrón", codigo_hexadecimal: "A52A2A" },
        { name: "Gris", codigo_hexadecimal: "808080" },
        { name: "Negro", codigo_hexadecimal: "000000" },
        { name: "Blanco", codigo_hexadecimal: "FFFFFF" },
        { name: "Plateado", codigo_hexadecimal: "C0C0C0" },
        { name: "Beige", codigo_hexadecimal: "F5F5DC" },
    ],
    products: [
        {
            description: "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
            images: [
                "camiseta_tesla_1.jpg",
                "camiseta_tesla_2.jpg",
                "camiseta_tesla_3.jpg",
            ],
            price: 75,
            slug: "mens_chill_crew_neck_sweatshirt",
            title: "Men’s Chill Crew Neck Sweatshirt",
            gender: "MASCULINO"
        },
        {
            description: "Camiseta básica de algodón con diseño moderno y ajuste perfecto.",
            images: [
                "camiseta_basica_algodon_1.jpg",
                "camiseta_basica_algodon_2.jpg",
            ],
            price: 29.99,
            slug: "camiseta_basica_algodon",
            title: "Camiseta Básica de Algodón",
            gender: "UNISEX",
        },
        {
            description: "Zapatillas deportivas diseñadas para brindar comodidad y estilo.",
            images: [
                "zapatillas_deportivas_1.jpg",
                "zapatillas_deportivas_2.jpg",
                "zapatillas_deportivas_3.jpg",
            ],
            price: 120,
            slug: "zapatillas_deportivas_comodas",
            title: "Zapatillas Deportivas",
            gender: "MASCULINO",
        },
        {
            description: "Pantalón de mezclilla de alta calidad con corte ajustado.",
            images: [
                "pantalon_mezquilla_dama1.jpg",
                "pantalon_mezquilla_dama2.jpg",
            ],
            price: 55,
            slug: "pantalon_mezclilla_corte_ajustado",
            title: "Pantalón de Mezclilla",
            gender: "FEMENINO",
        },
        {
            description: "Gorra de algodón con visera curva, ideal para el sol.",
            images: [
                "gorra_algodon_1.jpg",
                "gorra_algodon_2.jpg",
            ],
            price: 19.99,
            slug: "gorra_de_algodon",
            title: "Gorra de Algodón",
            gender: "UNISEX",
        },
        {
            description: "Remera de algodón con diseño exclusivo, ideal para cualquier ocasión.",
            images: [
                "remera_algodon_1.jpg",
                "remera_algodon_2.jpg",
                "remera_algodon_3.jpg",
            ],
            price: 35,
            slug: "remera_algodon_diseño",
            title: "Remera Algodón Diseño Exclusivo",
            gender: "UNISEX",
        },
        {
            description: "Pantalón cargo con múltiples bolsillos, cómodo y resistente.",
            images: [
                "pantalon_cargo1.jpg",
                "pantalon_cargo2.jpg",
            ],
            price: 65,
            slug: "pantalon_cargo_resistente",
            title: "Pantalón Cargo Resistente",
            gender: "MASCULINO",
        },
        {
            description: "Campera de invierno con forro térmico, perfecta para el frío extremo.",
            images: [
                "campera_invierno1.jpg",
                "campera_invierno2.jpg",
            ],
            price: 120,
            slug: "campera_invierno_termica",
            title: "Campera Invierno Térmica",
            gender: "UNISEX",
        },
        {
            description: "Zapatillas urbanas de cuero, combinando estilo y comodidad.",
            images: [
                "zapatillas_cuero1.jpg",
                "zapatillas_cuero2.jpg",
            ],
            price: 140,
            slug: "zapatillas_cuero_urbanas",
            title: "Zapatillas Urbanas de Cuero",
            gender: "MASCULINO",
        },
        {
            description: "Reloj analógico elegante, con correa de acero inoxidable.",
            images: [
                "reloj1.jpg",
                "reloj2.jpg",
            ],
            price: 180,
            slug: "reloj_analogico_acero",
            title: "Reloj Analógico Acero",
            gender: "UNISEX",
        },
        {
            description: "Bufanda de lana gruesa, perfecta para el invierno.",
            images: [
                "bufanda1.jpg",
                "bufanda2.jpg",
            ],
            price: 25,
            slug: "bufanda_lana_invierno",
            title: "Bufanda de Lana Invierno",
            gender: "UNISEX",
        },
        {
            description: "Cartera de cuero sintético con varios compartimentos internos.",
            images: [
                "cartera1.jpg",
                "cartera2.jpg",
            ],
            price: 95,
            slug: "cartera_cuero_sintetico",
            title: "Cartera Cuero Sintético",
            gender: "FEMENINO",
        },
        {
            description: "Zapatos de vestir con acabado en gamuza, sofisticados y elegantes.",
            images: [
                "zapatos_gamuza1.jpg",
                "zapatos_gamuza2.jpg",
            ],
            price: 110,
            slug: "zapatos_gamuza_elegantes",
            title: "Zapatos Gamuza Elegantes",
            gender: "MASCULINO",
        },
        {
            description: "Camisa de lino, ligera y transpirable, ideal para el verano.",
            images: [
                "https://example.com/images/camisa_lino1.jpg",
                "https://example.com/images/camisa_lino2.jpg",
            ],
            price: 50,
            slug: "camisa_lino_verano",
            title: "Camisa de Lino Verano",
            gender: "MASCULINO",
        },
        {
            description: "Bolso deportivo de gran capacidad, ideal para llevar todo lo necesario.",
            images: [
                "bolso_deportivo1.jpg",
                "bolso_deportivo2.jpg",
            ],
            price: 80,
            slug: "bolso_deportivo_grande",
            title: "Bolso Deportivo Grande",
            gender: "UNISEX",
        }
    ]
}