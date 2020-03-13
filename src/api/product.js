import require from '@/utils/require';
export function getProduct(oParams) {
    return require.get('/get/product', {
        params: oParams.params
    });
};

export function getProductDetail(oParams){
    return require.get('/get/product/detail', {
      params: oParams.params
    });
  };