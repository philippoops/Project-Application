// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { useState } from 'react';
import { useFireStore } from '../../apps/hooks/firestore/useFireStore';
import { auth, storage } from '../../apps/config/firebase';
import { createId } from '@paralleldrive/cuid2';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Profile } from '../../apps/layouts/types/profile';
import { updateProfile } from 'firebase/auth';

type Props = {
  profile: Profile;
  setEditMode: (value: boolean) => void;
};
registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginImageTransform
);
export default function PhotoUpload({ profile, setEditMode }: Props) {
  const [files, setFiles] = useState<any>([]);
  const { update } = useFireStore('profiles');
  const { set } = useFireStore(`profiles/${auth.currentUser?.uid}/photos`);
  return (
    <FilePond
      files={files}
      onupdatefiles={setFiles}
      allowMultiple={false}
      maxFiles={1}
      server={{
        // by using the _ underscrore it means the parameter is not used
        process: (_fieldName, file, _metadata, load, error, progress) => {
          const id = createId();
          const storageRef = ref(
            storage,
            `${auth.currentUser?.uid}/user_images/${id}`
          );
          const task = uploadBytesResumable(storageRef, file);

          task.on(
            'state_changed',
            (snap) => {
              progress(true, snap.bytesTransferred, snap.totalBytes);
            },
            (err) => {
              error(err.message);
            },
            () => {
              getDownloadURL(task.snapshot.ref).then(async (url) => {
                if (!profile.photoURL) {
                  await update(profile.id, {
                    photoURL: url,
                  });
                  await updateProfile(auth.currentUser!, {
                    photoURL: url,
                  });
                }
                await set(id, {
                  name: file.name,
                  url,
                });
                setEditMode(false);
              });
              load(id);
            }
          );
        },
      }}
      name="files"
      labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      credits={false}
      allowImageCrop={true}
      imageCropAspectRatio="1:1"
      instantUpload={false}
    />
  );
}
