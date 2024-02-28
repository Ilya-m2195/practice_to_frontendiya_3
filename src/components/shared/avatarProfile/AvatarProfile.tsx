import { FC } from 'react';

import { Avatar, Box, Button, rem, Group, Text, FileButton } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { IconTrash, IconUpload } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

import style from 'components/shared/avatarProfile/avatarProfile.module.css';
import { accept } from 'components/shared/avatarProfile/config';
import { FileCollections } from 'constant';
import { getFileNameFromURL } from 'helpers';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
  updateUserThank,
  getId,
  changeUserPhotoThank,
  deleteDataStorageThunk,
} from 'store';

interface IProps {
  photoURL: Nullable<string>;
}
export const AvatarProfile: FC<IProps> = ({ photoURL }) => {
  const { hovered, ref } = useHover();

  const dispatch = useAppDispatch();
  const id = useAppSelector(getId);

  const { t } = useTranslation();

  const uploadFile = (file: Nullable<File>): void => {
    if (file) {
      dispatch(changeUserPhotoThank(file));
    }
  };

  const removeAvatar = (): void => {
    if (!photoURL) return;

    const values = {
      photoURL: null,
    };

    const fileData = {
      fileCollection: FileCollections.Images,
      fileName: getFileNameFromURL(photoURL),
    };

    dispatch(updateUserThank({ id, values }));
    dispatch(deleteDataStorageThunk(fileData));
  };

  const openModalRemoveAvatar = (): void => {
    modals.openConfirmModal({
      title: t('removeAvatar'),
      centered: true,
      children: <Text size='sm'>{t('removeAvatarContent')}</Text>,
      labels: { confirm: t('remove'), cancel: t('cancel') },
      confirmProps: { color: 'red' },
      onConfirm: () => removeAvatar(),
    });
  };

  return (
    <Box pos='relative'>
      <Avatar src={photoURL} size='100' />

      <Group
        className={style.btnGroup}
        justify='center'
        pos='absolute'
        w='100%'
        h='26px'
        top='50%'
        left='0'
        opacity={hovered ? 1 : 0}
        ref={ref}
      >
        <Button
          variant='filled'
          size='compact-sm'
          aria-label='Settings'
          onClick={openModalRemoveAvatar}
        >
          <IconTrash style={{ width: rem('14') }} stroke={1.5} />
        </Button>

        <FileButton onChange={(file) => uploadFile(file)} accept={accept}>
          {(props) => (
            <Button {...props} variant='filled' size='compact-sm' aria-label='Settings'>
              <IconUpload style={{ width: rem('14') }} stroke={1.5} />
            </Button>
          )}
        </FileButton>
      </Group>
    </Box>
  );
};
