import { FC, useEffect } from 'react';

import { Box, Button, Flex, Select, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { ChangeBalanceForm } from 'components';
import { ModalsId, UserRole } from 'constant';
import { validateNickname } from 'helpers';
import { useAppDispatch, useAppSelector } from 'hooks';
import { getIsOccupiedNick, updateUserThank, setCurrentBalance, setUserId } from 'store';
import { IUpdateUser } from 'types';

export const UserEditingPage: FC = () => {
  const navigate = useNavigate();
  const currentUserData = useLocation().state;
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const isOccupiedNick = useAppSelector(getIsOccupiedNick);

  const { t } = useTranslation();

  const goBackHandler = (): void => {
    navigate(-1);
  };

  const openModalBalance = (): void => {
    if (!id) {
      return;
    }

    modals.openContextModal({
      modal: ModalsId.FormModal,
      title: t('changeBalance'),
      centered: true,
      innerProps: {
        modalBody: <ChangeBalanceForm userId={id} />,
      },
    });
  };

  const { onSubmit, getInputProps, reset } = useForm({
    validateInputOnChange: ['nickname'],
    initialValues: {
      nickname: '',
      fullName: '',
      phone: '',
      role: UserRole.User,
    },
    validate: {
      nickname: (value) => validateNickname(dispatch, value, isOccupiedNick),
    },
  });

  const onSubmitHandler = (values: IUpdateUser): void => {
    if (!id) {
      return;
    }

    dispatch(updateUserThank({ id, values })).then(() => {
      reset();
    });
  };

  useEffect(() => {
    dispatch(setCurrentBalance(currentUserData.balance));
  }, [dispatch, setCurrentBalance, currentUserData]);

  useEffect(() => {
    dispatch(setUserId(id));
  }, [dispatch, setUserId]);

  return (
    <Box>
      <Title mb='xl' order={2}>
        {t('clientEditing')}
      </Title>
      <Button mb='lg' onClick={goBackHandler}>
        {t('backToClients')}
      </Button>

      <form onSubmit={onSubmit(onSubmitHandler)}>
        <Flex gap='md' align='end' wrap='wrap'>
          <TextInput
            label={t('nickname')}
            placeholder={t('addNickname')}
            {...getInputProps('nickname')}
          />
          <TextInput
            label={t('fullName')}
            placeholder={t('AddFullName')}
            {...getInputProps('fullName')}
          />
          <Select
            label={t('role')}
            data={[UserRole.User, UserRole.Admin]}
            {...getInputProps('role')}
          />
          <TextInput
            disabled
            label={t('phone')}
            placeholder='+7-999-999-99-99'
            {...getInputProps('phone')}
          />
          <Button type='submit'>{t('save')}</Button>
        </Flex>
      </form>

      <Button mt='lg' onClick={openModalBalance}>
        {t('changeBalance')}
      </Button>
    </Box>
  );
};
