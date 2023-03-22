import { API_URL } from '../config';
/* SELECTORS */

export const getAds = ({ ads }) => ads.data;

export const getAdById = ({ ads }, id) => ads.data.find((ad) => ad._id === id);

export const getAdsByPhrase = ({ ads }, searchPhrase) =>
  ads.data.filter((ad) =>
    ad.title.toLowerCase().includes(searchPhrase.toLowerCase())
  );

/* ACTIONS */
const createActionName = (actionName) => `app/ads/${actionName}`;
const ADD_AD = createActionName('ADD_AD');
const EDIT_AD = createActionName('EDIT_AD');
const DELETE_AD = createActionName('DELETE_AD');
const LOAD_ADS = createActionName('LOAD_ADS');

/* ACTION CREATORS */

export const addAd = (payload) => ({ payload, type: ADD_AD });
export const editAd = (payload) => ({ payload, type: EDIT_AD });
export const deleteAd = (payload) => ({ payload, type: DELETE_AD });
export const loadAds = (payload) => ({ payload, type: LOAD_ADS });

/* THUNKS */

export const loadAdsRequest = () => {
  return async (dispatch) => {
    fetch(`${API_URL}/ads`)
      .then((res) => res.json())
      .then((res) => {
        dispatch(loadAds(res));
      });
  };
};

export const addAdRequest = (newAd) => {
  const fd = new FormData();
  fd.append('title', newAd.title);
  fd.append('text', newAd.text);
  fd.append('location', newAd.location);
  fd.append('price', newAd.price);
  fd.append('img', newAd.img);

  return (dispatch) => {
    const options = {
      method: 'POST',
      credentials: 'include',
      body: fd,
    };

    fetch(`${API_URL}/ads`, options)
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        }
      })
      .then((res) => {
        dispatch(addAd(res.newAd));
      });
  };
};

export const editAdRequest = (edAd, id) => {
  const fd = new FormData();
  fd.append('title', edAd.title);
  fd.append('text', edAd.text);
  fd.append('location', edAd.location);
  fd.append('price', edAd.price);
  fd.append('img', edAd.img);

  return (dispatch) => {
    const options = {
      method: 'PUT',
      credentials: 'include',
      body: fd,
    };

    fetch(`${API_URL}/ads/${id}`, options)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((res) => {
        dispatch(editAd(res.editAd));
      });
  };
};

export const deleteAdRequest = (id) => {
  return (dispatch) => {
    const options = { method: 'DELETE', credentials: 'include' };

    fetch(`${API_URL}/ads/${id}`, options).then((res) => {
      if (res.status === 200) {
        dispatch(deleteAd(id));
      }
    });
  };
};

/* INITIAL STATE */

const initialState = {
  data: [],
  request: {},
};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case ADD_AD:
      return { ...statePart, data: [...statePart.data, action.payload] };
    case EDIT_AD:
      return {
        ...statePart,
        data: statePart.data.map((ad) =>
          ad._id === action.payload._id ? { ...ad, ...action.payload } : ad
        ),
      };
    case DELETE_AD:
      return {
        ...statePart,
        data: statePart.data.filter((ad) => ad._id !== action.payload),
      };
    case LOAD_ADS:
      return { ...statePart, data: [...action.payload] };
    default:
      return statePart;
  }
}
