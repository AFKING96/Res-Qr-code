import { createClient } from "@sanity/client";
import { menuItems } from "./menuData";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "nfbe39tj",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

async function main() {
    console.log("Deleting existing menu items...");
    try {
        await client.delete({
            query: '*[_type == "menuItem"]'
        });
        console.log("Deleted existing menu items.");
    } catch (e) {
        console.error("Error deleting items:", e);
    }

    console.log(`Inserting ${menuItems.length} new items...`);

    let insertedCount = 0;
    for (const item of menuItems) {
        try {
            await client.create({
                _type: "menuItem",
                name: item.name,
                price: item.price,
                category: item.category,
            });
            console.log("Created:", item.name);
            insertedCount++;
        } catch (err) {
            console.error(`Error inserting ${item.name}:`, err);
        }
    }

    console.log(`\nSuccessfully completed! Inserted ${insertedCount} items.`);

    // Verification
    const allItems = await client.fetch(`*[_type == "menuItem"]{ category }`);
    console.log(`Total documents in Sanity: ${allItems.length}`);
    const categories = [...new Set(allItems.map((i: any) => i.category))];
    console.log("Categories in Sanity:");
    categories.forEach(c => console.log(`  ${c}`));
}

main().catch((err) => {
    console.error("Script failed:", err);
    process.exit(1);
});
