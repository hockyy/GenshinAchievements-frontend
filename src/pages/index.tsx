import { useState } from 'react';

import {
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';

import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  const TITLE_COLOR = '#9f8468';
  const BASE_URL_DEV = 'http://localhost:80';
  const BASE_URL_PROD = 'https://api-genshin.hocky.id';
  let BASE_URL = BASE_URL_PROD;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    BASE_URL = BASE_URL_DEV;
  }
  const [image, setImage] = useState(`${BASE_URL}/static/dummy.png`);

  const postQuery = async (values: { takarir: string; bahasa: string }) => {
    return axios
      .post(
        `${BASE_URL}/genshin`,
        {
          caption: values.takarir,
          language: values.bahasa,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods':
              'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers':
              'Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length',
          },
        }
      )
      .then((response) => {
        return `${BASE_URL}${response.data.url}`;
      })
      .catch(() => {
        alert('Server sedang bermasalah!');
        return `https://blog.hocky.id/assets/images/felix-sad.gif`;
      });
  };
  return (
    <Main
      meta={
        <Meta
          title="Pembuat Achievement Genshin Impact"
          description="Buat achievement genshin pribadimu!"
        />
      }
    >
      <Center className={'m-3'}>
        <img className={'max-h-40'} src={image} alt={'🥇 Gambar achievement'} />
      </Center>
      <Formik
        initialValues={{ takarir: 'Si Paling Keren!', bahasa: 'ID' }}
        onSubmit={async (values) => {
          postQuery(values).then((res) => {
            setImage(res);
          });
        }}
      >
        <Form>
          <Field name={'takarir'}>
            {({ field }: { field: any }) => {
              return (
                <FormControl className={'m-3'}>
                  <FormLabel htmlFor={'takarir'}>Takarir</FormLabel>
                  <Input
                    {...field}
                    id={'takarir'}
                    type="text"
                    placeholder={'Si Paling Primo Geovishap'}
                  />
                  <FormHelperText>
                    Takarir untuk penamaan <i>achievement</i>
                  </FormHelperText>
                </FormControl>
              );
            }}
          </Field>

          <Field name={'bahasa'}>
            {({ field }: { field: any }) => {
              return (
                <FormControl className={'m-3'}>
                  <FormLabel htmlFor={'bahasa'}>Bahasa</FormLabel>
                  <Select {...field} id={'bahasa'}>
                    <option value="ID">Bahasa Indonesia</option>
                    <option value="EN">Bahasa Inggris (English)</option>
                  </Select>
                  <FormHelperText>
                    Bahasa <i>achievement</i>
                  </FormHelperText>
                </FormControl>
              );
            }}
          </Field>
          <Center>
            <Button
              className={'m-3'}
              color={'white'}
              _hover={{ bg: '#785E44' }}
              backgroundColor={TITLE_COLOR}
              type="submit"
            >
              Buat&nbsp; <i>achievement</i>
            </Button>
          </Center>
        </Form>
      </Formik>
    </Main>
  );
};

export default Index;
