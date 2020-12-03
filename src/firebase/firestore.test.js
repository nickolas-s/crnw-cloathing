import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

firestore
  .collection('users')
  .doc('IcToBUVo7bHkh1jFjdBf')
  .collection('cartItems')
  .doc('ZaD4kt2widwJKY0TOxyo');

// Get Item
firestore.doc('/users/IcToBUVo7bHkh1jFjdBf/cartItems/ZaD4kt2widwJKY0TOxyo');

// Get Collection of items
firestore.doc('/users/IcToBUVo7bHkh1jFjdBf/cartItems');
