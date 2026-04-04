-- Seed all products with colors, sizes, stock and detailed descriptions

-- ══════════════════════════════════════════════════════════════
-- КРОССОВКИ
-- ══════════════════════════════════════════════════════════════

-- ID 22: Кроссовки Adidas
UPDATE "Product" SET
  image       = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
  description = 'Легендарные кроссовки Adidas с технологией Boost для максимальной амортизации и возврата энергии. Прочный верх из дышащего сетчатого материала обеспечивает оптимальную вентиляцию стопы. Резиновая подошва Continental™ с улучшенным сцеплением на любых поверхностях. Идеальны как для профессиональных тренировок, так и для повседневного использования.',
  stock       = 54,
  sizes       = '["36","37","38","39","40","41","42","43","44","45"]'::jsonb,
  colors      = '[
    {
      "name": "Белый",
      "hex": "#F5F5F5",
      "images": [
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      "name": "Чёрный",
      "hex": "#1A1A1A",
      "images": [
        "https://images.unsplash.com/photo-1584735175315-9d5df23be4be?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      "name": "Зелёный",
      "hex": "#2E7D32",
      "images": [
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80"
      ]
    }
  ]'::jsonb
WHERE id = 22;

-- ID 23: Кроссовки Air Max
UPDATE "Product" SET
  image       = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
  description = 'Nike Air Max — культовая модель с видимой воздушной подушкой Air, обеспечивающей непревзойдённую амортизацию. Инновационная пенная промежуточная подошва Foam поглощает удары при каждом шаге. Верх из эластичного материала Flyknit плотно облегает стопу. Классическое наследие бренда в сочетании с передовыми спортивными технологиями.',
  stock       = 38,
  sizes       = '["36","37","38","39","40","41","42","43","44","45","46"]'::jsonb,
  colors      = '[
    {
      "name": "Красный",
      "hex": "#CC0000",
      "images": [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      "name": "Белый",
      "hex": "#F5F5F5",
      "images": [
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      "name": "Синий",
      "hex": "#1565C0",
      "images": [
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80"
      ]
    }
  ]'::jsonb
WHERE id = 23;

-- ID 24: Кроссовки Under Armour
UPDATE "Product" SET
  image       = 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80',
  description = 'Under Armour HOVR — технология с нулевой гравитацией, обеспечивающая ощущение невесомости при беге. Сетчатый верх UA Warp обвивает стопу для поддержки без ограничения движений. Подошва из твёрдой резины с рисунком протектора для оптимального сцепления. Встроенный датчик подключается к приложению MapMyRun для анализа каждой пробежки.',
  stock       = 29,
  sizes       = '["38","39","40","41","42","43","44","45"]'::jsonb,
  colors      = '[
    {
      "name": "Серый",
      "hex": "#757575",
      "images": [
        "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      "name": "Чёрный",
      "hex": "#212121",
      "images": [
        "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1584735175315-9d5df23be4be?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      "name": "Тёмно-синий",
      "hex": "#0D1B4B",
      "images": [
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80"
      ]
    }
  ]'::jsonb
WHERE id = 24;

-- ══════════════════════════════════════════════════════════════
-- ФУТБОЛКИ
-- ══════════════════════════════════════════════════════════════

-- ID 14: Футболка Adidas
UPDATE "Product" SET
  image       = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
  description = 'Функциональная спортивная футболка Adidas из материала AEROREADY, который мгновенно поглощает влагу и поддерживает ощущение сухости во время тренировки. Плоские швы исключают раздражение кожи при интенсивных движениях. Удлинённая спинка обеспечивает надёжное покрытие. Три полоски на плечах — культовый знак подлинного Adidas.',
  stock       = 83,
  sizes       = '["XS","S","M","L","XL","XXL"]'::jsonb,
  colors      = '[
    {
      "name": "Белый",
      "hex": "#FAFAFA",
      "images": [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      "name": "Чёрный",
      "hex": "#111111",
      "images": [
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1503341338985-95fdfe67ab74?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      "name": "Тёмно-синий",
      "hex": "#1A237E",
      "images": [
        "https://images.unsplash.com/photo-1503341338985-95fdfe67ab74?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=80"
      ]
    }
  ]'::jsonb
WHERE id = 14;

-- ID 15: Футболка Nike
UPDATE "Product" SET
  image       = 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
  description = 'Футболка Nike Dri-FIT с революционной технологией отвода влаги, которая тянет пот от кожи на поверхность ткани, где он быстро испаряется. Облегчённая конструкция снижает вес и сопротивление воздуха. Ткань с защитой от ультрафиолетового излучения UPF 40+. Эластичный материал растягивается во всех направлениях для свободы движений.',
  stock       = 67,
  sizes       = '["XS","S","M","L","XL","XXL","3XL"]'::jsonb,
  colors      = '[
    {
      "name": "Белый",
      "hex": "#FFFFFF",
      "images": [
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      "name": "Красный",
      "hex": "#CC0000",
      "images": [
        "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1503341338985-95fdfe67ab74?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1621784563330-caee0b138a00?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      "name": "Чёрный",
      "hex": "#0D0D0D",
      "images": [
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1503341338985-95fdfe67ab74?auto=format&fit=crop&w=800&q=80"
      ]
    }
  ]'::jsonb
WHERE id = 15;

-- ID 16: Футболка AKA
UPDATE "Product" SET
  image       = 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80',
  description = 'Премиальная спортивная футболка AKA из смесовой ткани Modal/Polyester — мягкость натурального волокна в сочетании с износостойкостью синтетики. Усиленные швы выдерживают интенсивные нагрузки. Анатомический крой повторяет контуры тела. Антибактериальная обработка ткани устраняет запах даже после долгой тренировки.',
  stock       = 42,
  sizes       = '["S","M","L","XL","XXL"]'::jsonb,
  colors      = '[
    {
      "name": "Чёрный",
      "hex": "#0A0A0A",
      "images": [
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1503341338985-95fdfe67ab74?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      "name": "Серый",
      "hex": "#9E9E9E",
      "images": [
        "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      "name": "Белый",
      "hex": "#F9F9F9",
      "images": [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=80"
      ]
    }
  ]'::jsonb
WHERE id = 16;

-- ID 17: Футболка Adidas 2nd
UPDATE "Product" SET
  image       = 'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=80',
  description = 'Классическая футболка Adidas Essentials из 100% хлопка с мягкой обработкой поверхности. Широкие рёберные манжеты на горловине и рукавах сохраняют форму после стирки. Вышитый логотип три полосы на груди. Универсальная модель для спорта, отдыха и повседневной жизни. Сертификат GOTS — произведена из органического хлопка.',
  stock       = 91,
  sizes       = '["XS","S","M","L","XL","XXL"]'::jsonb,
  colors      = '[
    {
      "name": "Серый меланж",
      "hex": "#BDBDBD",
      "images": [
        "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      "name": "Белый",
      "hex": "#FFFFFF",
      "images": [
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      "name": "Оливковый",
      "hex": "#556B2F",
      "images": [
        "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1503341338985-95fdfe67ab74?auto=format&fit=crop&w=800&q=80"
      ]
    }
  ]'::jsonb
WHERE id = 17;

-- ══════════════════════════════════════════════════════════════
-- ШОРТЫ
-- ══════════════════════════════════════════════════════════════

-- ID 18: Шорты NIKE
UPDATE "Product" SET
  image       = 'https://images.unsplash.com/photo-1591195853828-11db59a44f43?auto=format&fit=crop&w=800&q=80',
  description = 'Шорты Nike Flex с технологией Dri-FIT из ткани с четырёхсторонним растяжением для полной свободы движений. Эластичный пояс с затягивающимся шнуром обеспечивает надёжную посадку. Боковые карманы с застёжкой-молнией для безопасного хранения ценностей. Встроенные плавки из сетки для дополнительной поддержки и комфорта.',
  stock       = 58,
  sizes       = '["XS","S","M","L","XL","XXL"]'::jsonb,
  colors      = '[
    {
      "name": "Чёрный",
      "hex": "#121212",
      "images": [
        "https://images.unsplash.com/photo-1591195853828-11db59a44f43?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      "name": "Серый",
      "hex": "#757575",
      "images": [
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1591195853828-11db59a44f43?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      "name": "Красный",
      "hex": "#D32F2F",
      "images": [
        "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80"
      ]
    }
  ]'::jsonb
WHERE id = 18;

-- ID 19: Шорты Under Armour
UPDATE "Product" SET
  image       = 'https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=800&q=80',
  description = 'Шорты Under Armour Launch с технологией HeatGear®, разработанной для тренировок в жарких условиях. Ультралёгкая ткань с микроперфорацией обеспечивает максимальную вентиляцию. Отражающие элементы для безопасности при пробежках в тёмное время суток. Внутренние швы плоской конструкции исключают натирания даже при длинных дистанциях.',
  stock       = 35,
  sizes       = '["S","M","L","XL","XXL"]'::jsonb,
  colors      = '[
    {
      "name": "Чёрный",
      "hex": "#1C1C1C",
      "images": [
        "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1591195853828-11db59a44f43?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      "name": "Синий",
      "hex": "#1565C0",
      "images": [
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      "name": "Оливковый",
      "hex": "#4E6B2F",
      "images": [
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1591195853828-11db59a44f43?auto=format&fit=crop&w=800&q=80"
      ]
    }
  ]'::jsonb
WHERE id = 19;

-- ID 20: Шорты EA7
UPDATE "Product" SET
  image       = 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80',
  description = 'Шорты EA7 Emporio Armani из высококачественного быстросохнущего полиэстера с итальянским стилем. Широкий резиновый пояс с логотипом EA7 и регулируемый шнур. Боковые разрезы улучшают подвижность. Фирменная нашивка Eagle — символ итальянского премиум-класса. Для тех, кто ценит стиль на тренировке и вне её.',
  stock       = 21,
  sizes       = '["S","M","L","XL","XXL"]'::jsonb,
  colors      = '[
    {
      "name": "Тёмно-синий",
      "hex": "#0D1B4B",
      "images": [
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1591195853828-11db59a44f43?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      "name": "Чёрный",
      "hex": "#0A0A0A",
      "images": [
        "https://images.unsplash.com/photo-1591195853828-11db59a44f43?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      "name": "Серый",
      "hex": "#616161",
      "images": [
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=800&q=80"
      ]
    }
  ]'::jsonb
WHERE id = 20;

-- ID 21: Шорты PUMA
UPDATE "Product" SET
  image       = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
  description = 'Шорты Puma dryCELL с технологией отвода влаги для сухости и комфорта при тренировках. Лёгкий трикотаж с сетчатой подкладкой для дополнительной воздухопроницаемости. Боковые карманы для хранения мелких предметов. Фирменная полоска Puma вдоль боков. Этичное производство — коллекция Better Cotton Initiative.',
  stock       = 46,
  sizes       = '["XS","S","M","L","XL","XXL"]'::jsonb,
  colors      = '[
    {
      "name": "Чёрный",
      "hex": "#161616",
      "images": [
        "https://images.unsplash.com/photo-1591195853828-11db59a44f43?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      "name": "Красный",
      "hex": "#C62828",
      "images": [
        "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1591195853828-11db59a44f43?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      "name": "Зелёный",
      "hex": "#2E7D32",
      "images": [
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=800&q=80"
      ]
    }
  ]'::jsonb
WHERE id = 21;
