import { Grid } from 'semantic-ui-react';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/store';
import { useFireStore } from '../../apps/hooks/firestore/useFireStore';
import { useEffect } from 'react';
import { actions } from './profileSlice';
import LoadingComponents from '../../apps/layouts/LoadingComponents';

export default function ProfilePage() {
  const { id } = useParams();
  const { status, data } = useAppSelector((state) => state.profiles);
  const profile = data.find((x) => x.id === id);
  const { loadDocument } = useFireStore('profiles');

  // this actions in useEffect make sure this accurate from the profile actions
  useEffect(() => {
    if (id) loadDocument(id, actions);
  }, [id, loadDocument]);

  if (status === 'loading')
    return <LoadingComponents content="Loading profile..." />;

  if (!profile) return <h2>Not Found</h2>;
  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader profile={profile} />
        <ProfileContent profile={profile} />
      </Grid.Column>
    </Grid>
  );
}
