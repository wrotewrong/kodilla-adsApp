/* SELECTORS */

export const getAds = ({ ads }) => ads.data;

/* ACTIONS */

// action name creator

/* THUNKS */

/* INITIAL STATE */

const initialState = {
  data: [
    {
      _id: '6414642e7112563b6ce39229',
      title: 'Orange Tshirt',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vehicula…',
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
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vehicula…',
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
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vehicula…',
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
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vehicula…',
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
    default:
      return statePart;
  }
}
