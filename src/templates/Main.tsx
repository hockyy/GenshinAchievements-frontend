import { ReactNode } from 'react';

import HTMLReactParser from 'html-react-parser';

import { AppConfig } from '@/utils/AppConfig';
import { Changelog } from '@/utils/Changelog';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  return (
    <div className="px-4 w-full antialiased text-gray-700">
      {props.meta}

      <div className="mx-auto max-w-screen-md">
        <div className="border-b border-gray-300">
          <div className="pt-16 pb-8">
            <div className="text-3xl font-bold text-gray-900">
              {HTMLReactParser(AppConfig.title)}
            </div>
            <div className="text-xl">
              {HTMLReactParser(AppConfig.description)}
            </div>
          </div>
        </div>

        <div className="py-5 text-xl content">{props.children}</div>
        <div className="py-3 text-sm text-center border-t border-gray-300">
          <div className="text-sm">Biaya server tidak gratis 😢.</div>
          <div className="text-sm">
            Bantu{' '}
            <b className={'text-[#9f8468]'}>
              <a color={'#D02D23'} href="https://trakteer.id/hocky">
                → donasi ←
              </a>
            </b>{' '}
            agar{' '}
            <a color={'#D02D23'} href="https://hocky.id">
              Hocky 🍁
            </a>{' '}
            bisa <i className={'line-through'}>hedon</i> lanjut berkarya!
          </div>
        </div>

        <div className="py-3 text-sm text-center border-t border-gray-300">
          © Hak Cipta {new Date().getFullYear()}{' '}
          {HTMLReactParser(AppConfig.title)}. Dibuat dengan 💖 oleh{' '}
          <a href="https://hocky.id">Hocky</a> dan{' '}
          <a href="https://creativedesignsguru.com">CreativeDesignsGuru</a>
        </div>
        <div className="text-sm text-center border-gray-300">
          <div>
            {Changelog.data.map((changeVersion, indexChanges) => {
              return (
                <div key={indexChanges} className={'m-4'}>
                  {changeVersion.emoji}{' '}
                  <b>
                    Versi&nbsp;
                    {changeVersion.version}
                  </b>
                  :
                  {changeVersion.changes.map((change, indexVersion) => {
                    return <li key={indexVersion}>{change}</li>;
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Main };
