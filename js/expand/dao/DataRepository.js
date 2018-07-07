/**
 * Created by penn on 2016/12/21.
 */

import {
    AsyncStorage,
} from 'react-native';

export default class DataRepository {
    constructor() {
    }

    fetchNetRepository(url) {
        return new Promise((resolve, reject)=> {
            
                fetch(url)
                    .then((response)=>response.json())
                    .then(result=>{
                        resolve(result);
                    })
                    .catch((error)=> {
                        consloe.log(error);
                        reject(error);
                        throw error;
                    })
                
        })
    }
}