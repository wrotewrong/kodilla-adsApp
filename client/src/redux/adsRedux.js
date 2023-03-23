import { API_URL } from '../config';
/* SELECTORS */

export const getAds = ({ ads }) => ads.data;

export const getAdById = ({ ads }, id) => ads.data.find((ad) => ad._id === id);

export const getAdsByPhrase = ({ ads }, searchPhrase) =>
  ads.data.filter((ad) =>
    ad.title.toLowerCase().includes(searchPhrase.toLowerCase())
  );

export const getRequest = ({ ads }, name) => ads.requests[name];

/* ACTIONS */
const createActionName = (actionName) => `app/ads/${actionName}`;
export const ADD_AD = createActionName('ADD_AD');
export const EDIT_AD = createActionName('EDIT_AD');
export const DELETE_AD = createActionName('DELETE_AD');
export const LOAD_ADS = createActionName('LOAD_ADS');

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

/* ACTION CREATORS */

export const addAd = (payload) => ({ payload, type: ADD_AD });
export const editAd = (payload) => ({ payload, type: EDIT_AD });
export const deleteAd = (payload) => ({ payload, type: DELETE_AD });
export const loadAds = (payload) => ({ payload, type: LOAD_ADS });

export const startRequest = (payload) => ({ payload, type: START_REQUEST });
export const endRequest = (payload) => ({ payload, type: END_REQUEST });
export const errorRequest = (payload) => ({ payload, type: ERROR_REQUEST });

/* THUNKS */

export const loadAdsRequest = (id, phrase) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: LOAD_ADS }));
    if (id) {
      await fetch(`${API_URL}/ads/${id}`)
        .then((res) => res.json())
        .then((res) => {
          dispatch(loadAds(res));
        });
    } else if (phrase) {
      await fetch(`${API_URL}/ads/search/${phrase}`)
        .then((res) => res.json())
        .then((res) => {
          dispatch(loadAds(res));
        });
    } else {
      await fetch(`${API_URL}/ads`)
        .then((res) => res.json())
        .then((res) => {
          dispatch(loadAds(res));
        });
    }
    dispatch(endRequest({ name: LOAD_ADS }));
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
  requests: {},
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
    case START_REQUEST:
      return {
        ...statePart,
        requests: {
          ...statePart.requests,
          [action.payload.name]: { pending: true, error: null, success: false },
        },
      };
    case END_REQUEST:
      return {
        ...statePart,
        requests: {
          ...statePart.requests,
          [action.payload.name]: { pending: false, error: null, success: true },
        },
      };
    case ERROR_REQUEST:
      return {
        ...statePart,
        requests: {
          ...statePart.requests,
          [action.payload.name]: {
            pending: false,
            error: action.payload.message,
            success: false,
          },
        },
      };
    default:
      return statePart;
  }
}
