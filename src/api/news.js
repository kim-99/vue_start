import require from '@/utils/require';
export function getNews(oParams) {
    return require.get('/get/news', {
        params: oParams.params
    });
};

export function getNewsDetail(oParams){
    return require.get('/get/news/detail', {
      params: oParams.params
    });
  };