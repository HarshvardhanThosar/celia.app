function formatNumber(number: number): string {
  return new Intl.NumberFormat().format(number);
}

export type Locale =
  | "en-US" // United States
  | "en-GB" // United Kingdom
  | "de-DE" // Germany
  | "fr-FR" // France
  | "es-ES" // Spain
  | "it-IT" // Italy
  | "ja-JP" // Japan
  | "ko-KR" // South Korea
  | "zh-CN" // China (Simplified)
  | "zh-TW" // Taiwan (Traditional)
  | "ru-RU" // Russia
  | "pt-PT" // Portugal
  | "pt-BR" // Brazil
  | "nl-NL" // Netherlands
  | "sv-SE" // Sweden
  | "no-NO" // Norway
  | "da-DK" // Denmark
  | "fi-FI" // Finland
  | "pl-PL" // Poland
  | "cs-CZ" // Czech Republic
  | "hu-HU" // Hungary
  | "tr-TR" // Turkey
  | "ar-SA" // Saudi Arabia (Arabic)
  | "he-IL" // Israel (Hebrew)
  | "th-TH" // Thailand
  | "vi-VN" // Vietnam
  | "id-ID" // Indonesia
  | "ms-MY" // Malaysia
  | "hi-IN" // India (Hindi)
  | "en-IN" // India (English)
  | "en-CA" // Canada (English)
  | "fr-CA" // Canada (French)
  | "en-AU" // Australia
  | "en-NZ" // New Zealand
  | "en-IE" // Ireland
  | "en-ZA" // South Africa
  | "en-SG" // Singapore
  | "en-PH" // Philippines
  | "en-HK" // Hong Kong (English)
  | "zh-HK"; // Hong Kong (Chinese)

export type Currency =
  | "AED" // United Arab Emirates Dirham
  | "AFN" // Afghan Afghani
  | "ALL" // Albanian Lek
  | "AMD" // Armenian Dram
  | "ANG" // Netherlands Antillean Guilder
  | "AOA" // Angolan Kwanza
  | "ARS" // Argentine Peso
  | "AUD" // Australian Dollar
  | "AWG" // Aruban Florin
  | "AZN" // Azerbaijani Manat
  | "BAM" // Bosnia and Herzegovina Convertible Mark
  | "BBD" // Barbadian Dollar
  | "BDT" // Bangladeshi Taka
  | "BGN" // Bulgarian Lev
  | "BHD" // Bahraini Dinar
  | "BIF" // Burundian Franc
  | "BMD" // Bermudian Dollar
  | "BND" // Brunei Dollar
  | "BOB" // Bolivian Boliviano
  | "BRL" // Brazilian Real
  | "BSD" // Bahamian Dollar
  | "BTN" // Bhutanese Ngultrum
  | "BWP" // Botswana Pula
  | "BYN" // Belarusian Ruble
  | "BZD" // Belize Dollar
  | "CAD" // Canadian Dollar
  | "CDF" // Congolese Franc
  | "CHF" // Swiss Franc
  | "CLP" // Chilean Peso
  | "CNY" // Chinese Yuan
  | "COP" // Colombian Peso
  | "CRC" // Costa Rican Colón
  | "CUP" // Cuban Peso
  | "CVE" // Cape Verdean Escudo
  | "CZK" // Czech Koruna
  | "DJF" // Djiboutian Franc
  | "DKK" // Danish Krone
  | "DOP" // Dominican Peso
  | "DZD" // Algerian Dinar
  | "EEK" // Estonian Kroon
  | "EGP" // Egyptian Pound
  | "ERN" // Eritrean Nakfa
  | "ETB" // Ethiopian Birr
  | "EUR" // Euro
  | "FJD" // Fijian Dollar
  | "FKP" // Falkland Islands Pound
  | "GBP" // British Pound Sterling
  | "GEL" // Georgian Lari
  | "GGP" // Guernsey Pound
  | "GHS" // Ghanaian Cedi
  | "GIP" // Gibraltar Pound
  | "GMD" // Gambian Dalasi
  | "GNF" // Guinean Franc
  | "GTQ" // Guatemalan Quetzal
  | "GYD" // Guyanese Dollar
  | "HKD" // Hong Kong Dollar
  | "HNL" // Honduran Lempira
  | "HRK" // Croatian Kuna
  | "HTG" // Haitian Gourde
  | "HUF" // Hungarian Forint
  | "IDR" // Indonesian Rupiah
  | "ILS" // Israeli New Shekel
  | "INR" // Indian Rupee
  | "IQD" // Iraqi Dinar
  | "IRR" // Iranian Rial
  | "ISK" // Icelandic Króna
  | "JMD" // Jamaican Dollar
  | "JPY" // Japanese Yen
  | "KES" // Kenyan Shilling
  | "KGS" // Kyrgyzstani Som
  | "KHR" // Cambodian Riel
  | "KPW" // North Korean Won
  | "KRW" // South Korean Won
  | "KWD" // Kuwaiti Dinar
  | "KYD" // Cayman Islands Dollar
  | "KZT" // Kazakhstani Tenge
  | "LAK" // Laotian Kip
  | "LBP" // Lebanese Pound
  | "LKR" // Sri Lankan Rupee
  | "LRD" // Liberian Dollar
  | "LSL" // Lesotho Loti
  | "LYD" // Libyan Dinar
  | "MAD" // Moroccan Dirham
  | "MDL" // Moldovan Leu
  | "MGA" // Malagasy Ariary
  | "MKD" // Macedonian Denar
  | "MMK" // Myanmar Kyat
  | "MNT" // Mongolian Tögrög
  | "MOP" // Macanese Pataca
  | "MRU" // Mauritanian Ouguiya
  | "MUR" // Mauritian Rupee
  | "MVR" // Maldivian Rufiyaa
  | "MWK" // Malawian Kwacha
  | "MXN" // Mexican Peso
  | "MYR" // Malaysian Ringgit
  | "MZN" // Mozambican Metical
  | "NAD" // Namibian Dollar
  | "NGN" // Nigerian Naira
  | "NOK" // Norwegian Krone
  | "NPR" // Nepalese Rupee
  | "NZD" // New Zealand Dollar
  | "OMR" // Omani Rial
  | "PAB" // Panamanian Balboa
  | "PEN" // Peruvian Sol
  | "PGK" // Papua New Guinean Kina
  | "PHP" // Philippine Peso
  | "PKR" // Pakistani Rupee
  | "PLN" // Polish Zloty
  | "PYG" // Paraguayan Guarani
  | "QAR" // Qatari Rial
  | "RON" // Romanian Leu
  | "RSD" // Serbian Dinar
  | "RUB" // Russian Ruble
  | "RWF" // Rwandan Franc
  | "SAR" // Saudi Riyal
  | "SBD" // Solomon Islands Dollar
  | "SCR" // Seychellois Rupee
  | "SDG" // Sudanese Pound
  | "SEK" // Swedish Krona
  | "SGD" // Singapore Dollar
  | "SHP" // Saint Helena Pound
  | "SLL" // Sierra Leonean Leone
  | "SOS" // Somali Shilling
  | "SRD" // Surinamese Dollar
  | "SSP" // South Sudanese Pound
  | "STN" // São Tomé and Príncipe Dobra
  | "SVC" // Salvadoran Colón
  | "SZL" // Swazi Lilangeni
  | "THB" // Thai Baht
  | "TJS" // Tajikistani Somoni
  | "TMT" // Turkmenistani Manat
  | "TND" // Tunisian Dinar
  | "TOP" // Tongan Paʻanga
  | "TRY" // Turkish Lira
  | "TTD" // Trinidad and Tobago Dollar
  | "TWD" // New Taiwan Dollar
  | "TZS" // Tanzanian Shilling
  | "UAH" // Ukrainian Hryvnia
  | "UGX" // Ugandan Shilling
  | "USD" // United States Dollar
  | "UYU" // Uruguayan Peso
  | "UZS" // Uzbekistani Som
  | "VEF" // Venezuelan Bolívar
  | "VND" // Vietnamese Dong
  | "VUV" // Vanuatu Vatu
  | "WST" // Samoan Tala
  | "XAF" // Central African CFA Franc
  | "XCD" // East Caribbean Dollar
  | "XDR" // Special Drawing Rights
  | "XOF" // West African CFA Franc
  | "XPF" // CFP Franc
  | "YER" // Yemeni Rial
  | "ZAR" // South African Rand
  | "ZMW" // Zambian Kwacha
  | "ZWL"; // Zimbabwean Dollar

function formatCurrency(
  amount: number,
  locale: Locale = "en-US",
  currency: Currency = "EUR"
): string {
  return amount.toLocaleString(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2, // Limits to 2 decimal places if needed
    maximumFractionDigits: 2, // Limits to 2 decimal places if needed
  });
}

export { formatNumber, formatCurrency };
