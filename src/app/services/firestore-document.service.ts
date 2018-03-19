import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Subscription} from 'rxjs/Subscription';
import {Observer} from '../interfaces/Observer';

@Injectable()
export abstract class FirestoreDocumentService {

    private _parentCollection: AngularFirestoreCollection<object>;
    private _parentCollectionName: string;
    private _self: AngularFirestoreDocument<object>;
    name: string;
    subscription: Subscription;


    constructor(private _firestore: AngularFirestore) {
    }


    setup(collectionName, documentName, defaultContent: object) {
        this._parentCollectionName = collectionName;
        this.name = documentName;
        this._set_self(defaultContent);
    }


    update(newData: object) {
        this._self.update(newData);
    }


    getProperty(propertyName, observer: Observer): Subscription {
        return this._valueChanges((document) => {
            if (document[propertyName]) {
                observer(document[propertyName]);
            }
        });
    }


    getEntire(observer: Observer): Subscription {
        return this._valueChanges((document) => {
            observer(document);
        });
    }


    private _set_self(defaultContent: object) {
        this._parentCollection = this._firestore.collection(this._parentCollectionName);

        if (this._parentCollection) {
            this._self = this._parentCollection.doc(this.name);

            this.subscription = this._self.valueChanges().subscribe((response) => {
                if (!response) { // Then _self doesn't exist...
                    this._createDefaultDB(defaultContent);
                }
            });
        }
    }


    private _valueChanges(observer): Subscription {
        if (this._self) {
            return this._self.valueChanges().subscribe((document) => {
                if (document) {
                    observer(document);
                }
            });
        }
    }


    private _createDefaultDB(content) {
        this._parentCollection.doc(this.name).set(content);
    }


}
