import { defineType, defineField } from "sanity"

export default defineType({
    name: "menuItem",
    title: "Menu Item",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: "price",
            title: "Price",
            type: "number",
            validation: (Rule: any) => Rule.required().min(0),
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "string",
            options: {
                list: [
                    { title: "Classic", value: "classic" },
                    { title: "Drip Coffee", value: "drip" },
                    { title: "Flavoured Coffee", value: "flavoured" },
                    { title: "Matcha", value: "matcha" },
                    { title: "Hot Drinks", value: "hot" },
                    { title: "Refreshers", value: "refreshers" },
                    { title: "Sandwiches", value: "sandwiches" },
                    { title: "Desserts", value: "desserts" },
                ],
            },
        }),
        defineField({
            name: "image",
            title: "Image",
            type: "image",
            options: { hotspot: true },
        }),
    ],
})
