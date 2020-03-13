import require from '@/utils/require';
export function getIndex(oParams) {
    return require.get('/get/index', {
        params: oParams.params
    });
};