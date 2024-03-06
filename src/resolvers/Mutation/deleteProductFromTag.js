
export default async function deleteProductFromTag(parent,args, context) {
    console.log("addProductToTag", args);
  const shopId = args.shopId;
    const productIds = args.productIds;
    const tagId = args.tagId;
    console.log("addProductToTag", shopId, productIds, tagId);
  
  const tag = await context.mutations.deleteProductFromTag(context, {
    shopId,
    productIds,
    tagId,
  });
console.log("tag", tag);
  return tag;
}
