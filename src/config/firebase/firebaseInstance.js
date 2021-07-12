// import React, {Component} from 'react';
import app from '@react-native-firebase/app';
import auth, {firebase} from '@react-native-firebase/auth';
import database from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Axios from 'axios';

// import {connect} from 'react-redux';

// import {doAuthLogout} from '../redux/action/authAction';

export default class Firebase {
  constructor() {
    this.db = database();
    this.auth = auth();
    this.storage = storage();
    this.myAccout = this.auth.currentUser?.uid;
    this.role = null;
  }

  //TODO Sendfile to Firebase

  sendFile = async (uris = [], nameReq) => {
    let cobaPromall = Promise.all(
      uris.map((s) => {
        return fetch(s.uri).then((x) => {
          return x.blob();
        });
      }),
    ).then((z) => {
      return z;
    });

    // let fileprom = await Promise.resolve(file);

    const getfullPaths = new Promise(async (res, rej) => {
      let getFile = await cobaPromall;

      let Fullpath = Promise.all(
        getFile.map((fileSend, index) => {
          const path = `reqeust/photo/${nameReq}/${nameReq}${index}`;
          return this.storage
            .ref(path)
            .put(fileSend)
            .then((nama) => {
              return nama.metadata.fullPath;
            })
            .catch((err) => rej(err));
        }),
      ).then((data) => {
        return data;
      });

      res(Fullpath);
      rej('gagal');
    });

    return new Promise(async (res, rej) => {
      try {
        const fullPath = await getfullPaths;

        let getDownloadURL = Promise.all(
          fullPath.map((path) => {
            return this.storage.ref(path).getDownloadURL();
          }),
        ).then((data) => {
          return data;
        });

        res(getDownloadURL);
      } catch (error) {
        rej(error);
      }
    });
  };

  //! AUTH //! AUTH //! AUTH //! AUTH //! AUTH
  doAuthCreateNewUser = async (
    name,
    email,
    password,
    contact,
    role,
    prov,
    city,
  ) => {
    try {
      const {data} = await Axios.get(
        `https://emsifa.github.io/api-wilayah-indonesia/api/province/${prov}.json`,
      );

      const {user} = await this.auth.createUserWithEmailAndPassword(
        email,
        password,
      );
      await this.db
        .collection('user')
        .doc(user.uid)
        .set({role, email, name, contact, prov: data.name, city});
      if (role === 'guide') {
        await this.db
          .collection('guide')
          .doc(data.name)
          .collection(city)
          .doc(user.uid)
          .set({
            name,
            email,
            contact,
            role,
            province: data.name,
            city,
          });
      }
      return user;
    } catch (error) {
      return 'error';
    }
  };

  doAuthLoginUser = async (email, password) => {
    try {
      const {user} = await this.auth.signInWithEmailAndPassword(
        email,
        password,
      );
      const dbUser = await this.db.collection('user').doc(user.uid).get();

      return dbUser;
    } catch (error) {
      return 'error';
    }
  };

  doLogout = async () => {
    try {
      await this.auth.signOut();
      return 'logout';
    } catch (error) {
      return 'error';
    }
  };

  //! GUIDE //! GUIDE //! GUIDE //! GUIDE //! GUIDE
  doGuideSendPlace = async (
    prov,
    city,
    name,
    desc,
    price,
    openTime,
    closeTime,
    lat,
    lang,
    photos,
    type,
  ) => {
    try {
      const photoUploaded = await this.sendFile(photos, name);

      await this.db.collection('admin').doc('request').collection('place').add({
        prov,
        city,
        name,
        desc,
        price,
        openTime,
        closeTime,
        lat,
        lang,
        photo: photoUploaded,
        type,
      });

      return 'succeed';
    } catch (error) {
      return 'failed';
    }
  };

  doGuideAddPlaceWork = async (prov, city, idPlace, myUid) => {
    try {
      await this.db
        .collection('place')
        .doc(prov)
        .collection(city)
        .doc(idPlace)
        .collection('listGuide')
        .doc(myUid)
        .set({uid: myUid});

      await this.db
        .collection('user')
        .doc(myUid)
        .collection('workPlace')
        .doc(idPlace)
        .set({idWorkPlace: idPlace});

      return 'succeed';
    } catch (error) {
      return 'failed';
    }
  };
  doGuideMinPlaceWork = async (prov, city, idPlace, myUid) => {
    try {
      await this.db
        .collection('place')
        .doc(prov)
        .collection(city)
        .doc(idPlace)
        .collection('listGuide')
        .doc(myUid)
        .delete();

      await this.db
        .collection('user')
        .doc(myUid)
        .collection('workPlace')
        .doc(idPlace)
        .delete();

      return 'succeed';
    } catch (error) {
      return 'failed';
    }
  };

  doGuideGetPlaceWork = async (myUid) => {
    try {
      const data = await this.db
        .collection('user')
        .doc(myUid)
        .collection('workPlace')
        .get();

      const list = [];
      data.forEach((a) => {
        list.push(a.data());
      });

      return list;
    } catch (error) {
      return [];
    }
  };

  doGuideGetPlaceInfo = async (prov, city, idCity) => {
    try {
      const data = this.db
        .collection('place')
        .doc(prov)
        .collection(city)
        .doc(idCity)
        .get();

      return (await data).data();
    } catch (error) {}
  };

  doGuideAcceptRequest = async (myUID, otherUID) => {
    await this.db
      .collection('user')
      .doc(myUID)
      .collection('myRequest')
      .doc(otherUID)
      .update({status: 'accepted'});

    await this.db
      .collection('user')
      .doc(otherUID)
      .collection('myRequest')
      .doc(myUID)
      .update({status: 'accepted'});
  };

  doGuideGetReview = async (myUID) => {
    try {
      const data = await this.db
        .collection('user')
        .doc(myUID)
        .collection('myReview')
        .get();

      let list = [];

      data.forEach((doc) => {
        list.push({...doc.data(), id: doc.id});
      });

      return list;
    } catch (error) {}
  };

  doGuideWithDraw = async (myUID) => {
    try {
      await this.db.collection('user').doc(myUID).update({balance: 0});
    } catch (error) {}
  };
  doGuideSetPrice = async (myUID, amount) => {
    try {
      await this.db
        .collection('user')
        .doc(myUID)
        .update({price: parseInt(amount)});
    } catch (error) {}
  };

  //! USER //! USER //! USER //! USER //! USER //! USER
  doUserReqGuide = async (
    myUID,
    gUID,
    prov,
    city,
    placeUID,
    date,
    duration,
  ) => {
    try {
      await this.db
        .collection('user')
        .doc(myUID)
        .collection('myRequest')
        .doc(gUID)
        .set({
          status: 'request',
          otherUid: gUID,
          date,
          prov,
          city,
          placeUID,
          duration: parseInt(duration, 10),
        });

      await this.db
        .collection('user')
        .doc(gUID)
        .collection('myRequest')
        .doc(myUID)
        .set({
          status: 'request',
          otherUid: myUID,
          date,
          prov,
          city,
          placeUID,
          duration: parseInt(duration, 10),
        });

      return 'succed';
    } catch (error) {
      return 'error';
    }
  };

  doUserGetHistory = async (myUid) => {
    try {
      const data = await this.db
        .collection('user')
        .doc(myUid)
        .collection('myHistory')
        .get();

      let list = [];

      data.forEach((a) => {
        list.push({...a.data(), idHistory: a.id});
      });

      return list;
    } catch (error) {}
  };

  doUserOrderToHistoryGuide = async (myUID, otherUID, status) => {
    try {
      if (status == 'completed') {
        const guideInfo = await this.doGetCurrentUserInfo(myUID);
        const userInfo = await this.doGetCurrentUserInfo(otherUID);

        console.log('userinfo', userInfo);
        console.log('guideinfo', guideInfo);

        const result = userInfo.balance - guideInfo.price;

        await this.db
          .collection('user')
          .doc(otherUID)
          .update({balance: result});
      }

      const getDataReqUserPerc = await this.db
        .collection('user')
        .doc(myUID)
        .collection('myRequest')
        .doc(otherUID)
        .get();

      const getDataReqGuidePerc = await this.db
        .collection('user')
        .doc(otherUID)
        .collection('myRequest')
        .doc(myUID)
        .get();

      await this.db
        .collection('user')
        .doc(myUID)
        .collection('myRequest')
        .doc(otherUID)
        .delete();

      await this.db
        .collection('user')
        .doc(otherUID)
        .collection('myRequest')
        .doc(myUID)
        .delete();

      await this.db
        .collection('user')
        .doc(myUID)
        .collection('myHistory')
        .add({...getDataReqUserPerc.data(), status: status});

      await this.db
        .collection('user')
        .doc(otherUID)
        .collection('myHistory')
        .add({...getDataReqGuidePerc.data(), status: status});

      return 'succed';
    } catch (error) {
      return 'error';
    }
  };

  doUserAddBalanceAccount = async (myUID, amount) => {
    try {
      const data = await this.db.collection('user').doc(myUID).get();

      const getBalance = data.data().balance || 0;

      await this.db
        .collection('user')
        .doc(myUID)
        .update({balance: getBalance + parseInt(amount, 10)});

      return 'sukses';
    } catch (error) {
      return 'error';
    }
  };

  doUserGiveReview = async (
    myUID,
    otherUID,
    placeUID,
    prov,
    city,
    messageGuide,
    rateGuide,
    messagePlace,
    ratePlace,
    idHistory,
    date,
  ) => {
    try {
      await this.db
        .collection('user')
        .doc(otherUID)
        .collection('myReview')
        .doc(myUID)
        .set({sender: myUID, message: messageGuide, rate: rateGuide});

      await this.db
        .collection('place')
        .doc(prov)
        .collection(city)
        .doc(placeUID)
        .collection('review')
        .doc(myUID)
        .set({
          sender: myUID,
          message: messagePlace,
          rate: ratePlace,
          date,
        });

      await this.db
        .collection('user')
        .doc(myUID)
        .collection('myHistory')
        .doc(idHistory)
        .update({review: true});
    } catch (error) {
      return 'error';
    }
  };

  doUserGetOrderRequest = async (myUID) => {
    try {
      const data = await this.db
        .collection('user')
        .doc(myUID)
        .collection('myRequest')
        .get();
      let list = [];

      data.forEach((a) => {
        list.push({...a.data(), idHistory: a.id});
      });

      return list;
    } catch (error) {}
  };

  //! ADMIN //! ADMIN //! ADMIN //! ADMIN //! ADMIN

  doAdminGetRequestLocation = async () => {
    try {
      const data = await this.db
        .collection('admin')
        .doc('request')
        .collection('place')
        .get();

      let list = [];

      data.forEach((doc) => {
        list.push({id: doc.id, data: doc.data()});
      });

      return list;
    } catch (error) {
      return 'error';
    }
  };

  doAdminShowVerifUser = async () => {
    try {
      const data = await this.db
        .collection('admin')
        .doc('request')
        .collection('verifUser')
        .get();

      let list = [];

      data.forEach((doc) => {
        list.push(doc.data());
      });

      return list;
    } catch (error) {}
  };

  doAdminActionVerifPlaceAccept = async (data, id) => {
    try {
      await this.db
        .collection('place')
        .doc(data.prov)
        .collection(data.city)
        .add(data);

      await this.db
        .collection('admin')
        .doc('request')
        .collection('place')
        .doc(id)
        .delete();

      return 'sukses';
    } catch (error) {
      return error;
    }
  };

  doAdminActionVerifPlaceReject = async (id) => {
    try {
      await this.db
        .collection('admin')
        .doc('request')
        .collection('place')
        .doc(id)
        .delete();
      return 'sukses';
    } catch (error) {
      return error;
    }
  };

  //! UNIV //! UNIV //! UNIV //! UNIV //! UNIV //! UNIV //! UNIV
  doSettingChangePhoto = async (fileURI, newName, newContact, myUid) => {
    try {
      const ref = await this.storage.ref(`photo/${myUid}/myPhoto.png`);
      const send = await ref.put(fileURI);
      const getFullPathImage = await this.storage
        .ref(send.metadata.fullPath)
        .getDownloadURL();

      const updateDBUser = await this.db.collection('user').doc(myUid).update({
        profileImage: getFullPathImage,
        contact: newContact,
        name: newName,
      });

      return 'sukses';
    } catch (error) {
      return error;
    }
  };

  doGetCurrentUserInfo = async (myUid) => {
    try {
      const data = await this.db.collection('user').doc(myUid).get();
      return {...data.data(), id: data.id};
    } catch (error) {
      return error;
    }
  };

  doGetPlaceDetail = async (prov, city, idPlace) => {
    try {
      const data = await this.db
        .collection('place')
        .doc(prov)
        .collection(city)
        .doc(idPlace)
        .get();

      return data.data();
    } catch (error) {
      return {};
    }
  };

  doGetPlaceReview = async (prov, city, id) => {
    try {
      const data = await this.db
        .collection('place')
        .doc(prov)
        .collection(city)
        .doc(id)
        .collection('review')
        .get();

      const list = [];

      data.forEach((doc) => {
        list.push(doc.data());
      });
      return list;
    } catch (error) {
      return [];
    }
  };

  doListGetLocation = async (prov, city, type) => {
    try {
      const data = await this.db
        .collection('place')
        .doc(prov)
        .collection(city)
        .where('type', '==', type)
        .get();

      let list = [];

      data.forEach((doc) => {
        list.push({...doc.data(), id: doc.id});
      });

      return list;
    } catch (error) {
      return 'error';
    }
  };

  doCheckRole = async (myUid) => {
    try {
      const data = await this.db.collection('user').doc(myUid).get();

      return data.data().role;
    } catch (error) {
      return null;
    }
  };

  doLiveCheck = async () => {
    try {
      const query = this.db.collection('admin');

      const observer = query.onSnapshot((item) => item);
      return observer;
    } catch (error) {}
  };

  doGetListGuide = async (prov, city, idPlace) => {
    try {
      const data = await this.db
        .collection('place')
        .doc(prov)
        .collection(city)
        .doc(idPlace)
        .collection('listGuide')
        .get();

      const list = [];

      data.forEach((doc) => {
        list.push(doc.data());
      });
      return list;
    } catch (error) {
      return [];
    }
  };

  doGetRecomendationPlace = async (prov, city) => {
    try {
      const data = await this.db.collection('place');
    } catch (error) {}
  };
}
