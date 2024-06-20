import Shops from "../models/Shops";

export const UNIT_ARRAY = [
  { label: "Packet", value: "pkt" },
  { label: "Grams", value: "grm" },
  { label: "KG", value: "kg" },
  { label: "liter", value: "ltr" },
  { label: "bottle", value: "bottle" },
];

export const SHOPS = [
	new Shops('s1', 'Grocery', '#f5428d', 'grocery'),
	new Shops('s2', 'Needs24', '#f54242', 'needs'),
	new Shops('s3', 'Mandi', '#f5a442', 'mandi'),
	new Shops('s4', 'Chandni Chock', '#f5d142', 'chandanichock'),
	new Shops('s5', 'Meerut', '#41d95d', 'others'),
	new Shops('s5', 'Others', '#368dff', 'others'),
  ];

export let CATEGORY_LIST = [
	{
		"id": 2,
		"name": "Snacks"
	},
	{
		"id": 3,
		"name": "Toiletries"
	},
	{
		"id": 4,
		"name": "Masala"
	},
	{
		"id": 5,
		"name": "Daily Essentials"
	},
	{
		"id": 6,
		"name": "Fridge"
	},
  {
		"id": 7,
		"name": "Daal"
	}
]