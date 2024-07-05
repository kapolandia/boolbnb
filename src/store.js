import { reactive, watch } from 'vue';
import storage from 'store';

const APARTMENTS_KEY = 'apartments';
const SERVICES_KEY = 'services';
const SEARCH_INPUT_KEY = 'searchInput';
const LATITUDE_KEY = 'latitude';
const LONGITUDE_KEY = 'longitude';

export const store = reactive({
    apartments: storage.get(APARTMENTS_KEY) || [],
    services: storage.get(SERVICES_KEY) || [],
    searchInput: storage.get(SEARCH_INPUT_KEY) || '',
    latitude: storage.get(LATITUDE_KEY) || null,
    longitude: storage.get(LONGITUDE_KEY) || null,
});

watch(
    () => store.apartments,
    (newValue) => {
        storage.set(APARTMENTS_KEY, newValue);
    },
    { deep: true }
);

watch(
    () => store.services,
    (newValue) => {
        storage.set(SERVICES_KEY, newValue);
    },
    { deep: true }
);

watch(
    () => store.searchInput,
    (newValue) => {
        storage.set(SEARCH_INPUT_KEY, newValue);
    }
);

watch(
    () => store.latitude,
    (newValue) => {
        storage.set(LATITUDE_KEY, newValue);
    }
);

watch(
    () => store.longitude,
    (newValue) => {
        storage.set(LONGITUDE_KEY, newValue);
    }
);
