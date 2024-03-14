import { useEffect, useState } from 'react';
import { Tab, Grid, Header, Button, Card, Image } from 'semantic-ui-react';
import { Photo, Profile } from '../../apps/layouts/types/profile';
import { auth, storage } from '../../apps/config/firebase';
import PhotoUpload from './PhotoUpload';
import { useAppSelector } from '../../store/store';
import { useFireStore } from '../../apps/hooks/firestore/useFireStore';
import { actions } from './photosSlice';
import { updateProfile } from 'firebase/auth';
import { deleteObject, ref } from 'firebase/storage';
import { toast } from 'react-toastify';

type Props = {
  profile: Profile;
};
export default function ProfilePhotos({ profile }: Props) {
  const [editMode, setEditMode] = useState(false);
  const isCurrentUser = auth.currentUser?.uid === profile.id;
  const { data: photos, status } = useAppSelector((state) => state.photos);
  const { loadCollection, remove } = useFireStore(
    `profiles/${profile.id}/photos`
  );
  const { update } = useFireStore('profiles');
  useEffect(() => {
    loadCollection(actions);
  }, [loadCollection]);

  // this function use to update the profile picture

  async function handleSetMain(photo: Photo) {
    //
    await update(profile.id, {
      photoURL: photo.url,
    });
    // this function is to update the firebase auth currentUser
    await updateProfile(auth.currentUser!, {
      photoURL: photo.url,
    });
  }

  // this function use to delete the picture uploaded
  async function handleDeletePhoto(photo: Photo) {
    try {
      const storageRef = ref(storage, `${profile.id}/user_images/${photo.id}`);
      await deleteObject(storageRef);
      remove(photo.id);
    } catch (error: any) {
      toast.error(error.message);
    }
  }
  return (
    <Tab.Pane loading={status === 'loading'}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="photo" content="Photos" />

          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={editMode ? 'Cancel' : 'Add photo'}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>

        <Grid.Column width={16}>
          {editMode ? (
            <PhotoUpload profile={profile} setEditMode={setEditMode} />
          ) : (
            <Card.Group itemsPerRow={5}>
              {photos.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />

                  {isCurrentUser && (
                    <Button.Group>
                      <Button
                        basic
                        color="green"
                        disabled={photo.url === profile.photoURL}
                        onClick={() => handleSetMain(photo)}
                      >
                        Main
                      </Button>

                      <Button
                        basic
                        color="red"
                        icon="trash"
                        disabled={photo.url === profile.photoURL}
                        onClick={() => handleDeletePhoto(photo)}
                      />
                    </Button.Group>
                  )}
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
