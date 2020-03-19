import require from '@/utils/require';

export function getIndexIntroduce(oParams){
  return require.get('/get/index/introduce', {
    params: oParams.params
  });
};

export function getIndexProducts(oParams){
  return require.get('/get/index/products', {
    params: oParams.params
  });
};

export function getIndexImgNews(oParams){
  return require.get('/get/index/img/news', {
    params: oParams.params
  });
};

export function getIndexNews(oParams){
  return require.get('/get/index/news', {
    params: oParams.params
  });
};