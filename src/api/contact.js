import require from '@/utils/require';
export function getContact(oParams) {
    return require.get('/get/contact', {
        params: oParams.params
    });
};