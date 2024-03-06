export default async function addProductToTag(context, args) {
  const { collections } = context;
  const { Products, Shops, Tags } = collections;
  const shopId = args.shopId;
  const productIds = args.productIds;
  const tagId = args.tagId;
  console.log("addProductToTag", shopId, productIds, tagId);
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
        // Check if tagId already exists in hashtags, if not, add it
        if (!product.hashtags.includes(tagId)) {
            const updatedHashtags = [...product.hashtags, tagId];
            const updated = await Products.updateOne(
                { _id: productId },
                { $set: { hashtags: updatedHashtags } }
            );
            const updatedProduct = await Products.findOne({ _id: productId });
            console.log("updatedProduct", updatedProduct);
            updatedProducts.push(updatedProduct);
        }
    }
      await context.mutations.publishProducts(context, productIds);
    }
  

  return updatedProducts;
}
