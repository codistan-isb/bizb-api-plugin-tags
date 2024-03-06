export default async function deleteProductFromTag(context, args) {
    const { collections } = context;
    const { Products, Shops, Tags } = collections;
    const shopId = args.shopId;
    const productIds = args.productIds;
    const tagId = args.tagId;
    let updatedProducts = [];

    if (!shopId || !productIds || !tagId) {
        throw new Error("Required fields are missing");
    }

    const shop = await Shops.findOne({ _id: shopId });
    if (!shop) {
        throw new Error("Shop not found");
    }

    const tag = await Tags.findOne({ _id: tagId });
    if (!tag) {
        throw new Error("Tag not found");
    }

    // Update hashtags for each product and publish
    for (const productId of productIds) {
        const product = await Products.findOne({ _id: productId });
        if (product) {
            // Check if tagId exists in hashtags, if it does, remove it
            if (product.hashtags.includes(tagId)) {
                const updatedHashtags = product.hashtags.filter(hashtag => hashtag !== tagId);
                await Products.updateOne(
                    { _id: productId },
                    { $set: { hashtags: updatedHashtags } }
                );

                // Retrieve the updated product after the update
                const updatedProduct = await Products.findOne({ _id: productId });
                // Push the updated product to the array
                updatedProducts.push(updatedProduct);
                console.log("updatedProduct", updatedProduct);
            }
        }
        await context.mutations.publishProducts(context, productIds);
    }

    return updatedProducts;
}
