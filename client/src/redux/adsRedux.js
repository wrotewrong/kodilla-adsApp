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

/* ACTION CREATORS */

export const addAd = (payload) => ({ payload, type: ADD_AD });
export const editAd = (payload) => ({ payload, type: EDIT_AD });
export const deleteAd = (payload) => ({ payload, type: DELETE_AD });

/* THUNKS */

/* INITIAL STATE */

const initialState = {
  data: [
    {
      _id: '6414642e7112563b6ce39229',
      title: 'Orange Tshirt',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id commodi amet eligendi ipsam illum, tempora reiciendis placeat velit similique repellat mollitia maiores sint ratione qui ipsa dicta quam optio cum? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vehicula… Lorem ipsum dolor sit amet consectetur adipisicing elit. Id commodi amet eligendi ipsam illum, tempora reiciendis placeat velit similique repellat mollitia maiores sint ratione qui ipsa dicta quam optio cum?',
      date: '17-03-2023',
      img: 'tshirtOrange-1679057966828.jpg',
      price: 149,
      location: 'Łódź',
      user: {
        _id: '641464057112563b6ce39227',
        login: 'RandomMan',
        avatar: 'avatarMan-1679057925546.jpg',
        phone: '666777999',
      },
    },
    {
      _id: '641464567112563b6ce3922c',
      title: 'Black Tshirt',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id commodi amet eligendi ipsam illum, tempora reiciendis placeat velit similique repellat mollitia maiores sint ratione qui ipsa dicta quam optio cum? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vehicula… Lorem ipsum dolor sit amet consectetur adipisicing elit. Id commodi amet eligendi ipsam illum, tempora reiciendis placeat velit similique repellat mollitia maiores sint ratione qui ipsa dicta quam optio cum? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vehicula…',
      date: '17-03-2023',
      img: 'avatarWoman-1679057949467.jpeg',
      price: 99,
      location: 'Warszawa',
      user: {
        _id: '641464057112563b6ce39227',
        login: 'RandomMan',
        avatar: 'avatarMan-1679057925546.jpg',
        phone: '666777999',
      },
    },
    {
      _id: '641464567112563b6ce3922a',
      title: 'Black Tshirt',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id commodi amet eligendi ipsam illum, tempora reiciendis placeat velit similique repellat mollitia maiores sint ratione qui ipsa dicta quam optio cum? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vehicula… Lorem ipsum dolor sit amet consectetur adipisicing elit. Id commodi amet eligendi ipsam illum, tempora reiciendis placeat velit similique repellat mollitia maiores sint ratione qui ipsa dicta quam optio cum? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vehicula…',
      date: '17-03-2023',
      img: 'avatarMan-1679057925546.jpg',
      price: 99,
      location: 'Warszawa',
      user: {
        _id: '641464057112563b6ce39227',
        login: 'RandomMan',
        avatar: 'avatarMan-1679057925546.jpg',
        phone: '666777999',
      },
    },
    {
      _id: '641464567112563b6ce3922b',
      title: 'Black Tshirt',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id commodi amet eligendi ipsam illum, tempora reiciendis placeat velit similique repellat mollitia maiores sint ratione qui ipsa dicta quam optio cum? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vehicula… Lorem ipsum dolor sit amet consectetur adipisicing elit. Id commodi amet eligendi ipsam illum, tempora reiciendis placeat velit similique repellat mollitia maiores sint ratione qui ipsa dicta quam optio cum? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vehicula…',
      date: '17-03-2023',
      img: 'tshirtBlack-1679058006851.jpg',
      price: 99,
      location: 'Warszawa',
      user: {
        _id: '641464057112563b6ce39227',
        login: 'RandomMan',
        avatar: 'avatarMan-1679057925546.jpg',
        phone: '666777999',
      },
    },
  ],
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
          ad._id === action.payload.id ? { ...ad, ...action.payload } : ad
        ),
      };
    case DELETE_AD:
      return {
        ...statePart,
        data: statePart.data.filter((ad) => ad._id !== action.payload),
      };
    default:
      return statePart;
  }
}
