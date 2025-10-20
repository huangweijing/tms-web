import type { Problem, SearchQuery, PagedResult } from '@/types';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080';
const USE_MOCK = (import.meta.env.VITE_USE_MOCK ?? 'true') === 'true';

const seed: Problem[] = [
  {
    問題ＩＤ: 'e8da0b03-8722-4bb0-91b3-0f084332b989',
    問題文章: 'Javaでオブジェクト内容の比較に使うべきメソッドは？',
    難易度: 1,
    スキル: 'Java',
    模範回答: '826f8f2f-5a21-4051-9fb2-dfb91698fbae',
    模範回答理由: '正解は「equals()」。Javaの基礎として一般的な知識。',
    自動生成フラグ: 0,
    選択肢: [
      {
        選択肢ＩＤ: '826f8f2f-5a21-4051-9fb2-dfb91698fbae',
        選択肢文章: 'equals()',
        回答理由: '正解候補。',
      },
      {
        選択肢ＩＤ: '1bf27bba-6a8e-4292-9995-d3f2e10552d1',
        選択肢文章: '==',
        回答理由: '用語として不正確/未対応。',
      },
      {
        選択肢ＩＤ: '94751be1-97e1-4d50-b610-a94ec23c3a4d',
        選択肢文章: 'compareTo()',
        回答理由: '目的が異なる/非標準。',
      },
      {
        選択肢ＩＤ: 'c49299e1-9a53-43e3-8f8d-9437d730b7bd',
        選択肢文章: 'hashCode()',
        回答理由: '文法や用途が異なる。',
      },
    ],
  },
  {
    問題ＩＤ: '68e0ada1-0807-48ac-a912-aa2a0052ab20',
    問題文章: 'Pythonでリストの長さを取得するビルトイン関数は？',
    難易度: 2,
    スキル: 'Python',
    模範回答: 'f3201ab3-a2d0-414c-a1fd-03dadde78552',
    模範回答理由: '正解は「len()」。Pythonの基礎として一般的な知識。',
    自動生成フラグ: 0,
    選択肢: [
      {
        選択肢ＩＤ: 'f3201ab3-a2d0-414c-a1fd-03dadde78552',
        選択肢文章: 'len()',
        回答理由: '正解候補。',
      },
      {
        選択肢ＩＤ: '361adf19-dc50-42b1-a884-6fd17a956691',
        選択肢文章: 'size()',
        回答理由: '用語として不正確/未対応。',
      },
      {
        選択肢ＩＤ: '4a1c754c-5fbe-46e1-a2b5-c8eb30c851d9',
        選択肢文章: 'count()',
        回答理由: '目的が異なる/非標準。',
      },
      {
        選択肢ＩＤ: 'ade9d738-f288-4eed-83a0-5d4c93f87d16',
        選択肢文章: 'length()',
        回答理由: '文法や用途が異なる。',
      },
    ],
  },
  {
    問題ＩＤ: '4247d842-d294-4f7e-8225-a5ac22070f95',
    問題文章: 'Vue.jsで双方向バインディングを行うディレクティブは？',
    難易度: 3,
    スキル: 'VueJS',
    模範回答: '213eeb6d-e7fc-4a30-8f49-a4cbe21319c6',
    模範回答理由: '正解は「v-model」。VueJSの基礎として一般的な知識。',
    自動生成フラグ: 0,
    選択肢: [
      {
        選択肢ＩＤ: '213eeb6d-e7fc-4a30-8f49-a4cbe21319c6',
        選択肢文章: 'v-model',
        回答理由: '正解候補。',
      },
      {
        選択肢ＩＤ: 'aa41430d-6450-41db-956c-3dfa5155283e',
        選択肢文章: 'v-bind',
        回答理由: '用語として不正確/未対応。',
      },
      {
        選択肢ＩＤ: 'a83b11d1-0c43-4941-ace8-3092763a48b1',
        選択肢文章: 'v-if',
        回答理由: '目的が異なる/非標準。',
      },
      {
        選択肢ＩＤ: 'c3123fe2-c058-4577-aa4e-62d9cd9e5dac',
        選択肢文章: 'v-on',
        回答理由: '文法や用途が異なる。',
      },
    ],
  },
  {
    問題ＩＤ: '48ce3390-0a1d-48d4-bc0f-3f0f803a992a',
    問題文章: 'JSで配列の末尾に要素を追加するメソッドは？',
    難易度: 4,
    スキル: 'JavaScript',
    模範回答: 'e13facac-3387-4255-ad07-5ceb0a24173d',
    模範回答理由: '正解は「push()」。JavaScriptの基礎として一般的な知識。',
    自動生成フラグ: 0,
    選択肢: [
      {
        選択肢ＩＤ: 'e13facac-3387-4255-ad07-5ceb0a24173d',
        選択肢文章: 'push()',
        回答理由: '正解候補。',
      },
      {
        選択肢ＩＤ: '3afc12a1-80b0-4115-bcf2-055854a8b51a',
        選択肢文章: 'append()',
        回答理由: '用語として不正確/未対応。',
      },
      {
        選択肢ＩＤ: '568110cd-b17a-4e60-a727-280b1db18ee9',
        選択肢文章: 'add()',
        回答理由: '目的が異なる/非標準。',
      },
      {
        選択肢ＩＤ: 'bbedb326-0a9c-40c2-96d3-ec296df94ff1',
        選択肢文章: 'insert()',
        回答理由: '文法や用途が異なる。',
      },
    ],
  },
  {
    問題ＩＤ: '1e0c8039-6f90-4d70-bb0e-950429b47445',
    問題文章: 'SQLで全件取得の基本文は？',
    難易度: 5,
    スキル: 'SQL',
    模範回答: '47f2ffb4-77a1-4bd8-a8a8-f6b0a773b12b',
    模範回答理由: '正解は「SELECT * FROM テーブル」。SQLの基礎として一般的な知識。',
    自動生成フラグ: 0,
    選択肢: [
      {
        選択肢ＩＤ: '47f2ffb4-77a1-4bd8-a8a8-f6b0a773b12b',
        選択肢文章: 'SELECT * FROM テーブル',
        回答理由: '正解候補。',
      },
      {
        選択肢ＩＤ: '8bbe0508-f17d-4a77-bf64-20c85192ecf5',
        選択肢文章: 'GET ALL テーブル',
        回答理由: '用語として不正確/未対応。',
      },
      {
        選択肢ＩＤ: '227e891f-2f91-4e45-a544-161a5888f6e1',
        選択肢文章: 'FIND テーブル',
        回答理由: '目的が異なる/非標準。',
      },
      {
        選択肢ＩＤ: 'f2e8ea65-9881-46ec-8e8b-7ad31ba7f35c',
        選択肢文章: 'LIST テーブル',
        回答理由: '文法や用途が異なる。',
      },
    ],
  },
  {
    問題ＩＤ: '1c0e11f0-be28-40fd-80b0-2adfaad18bc5',
    問題文章: 'Spring Bootでアプリ設定を記述する既定ファイルは？',
    難易度: 6,
    スキル: 'Spring Boot',
    模範回答: '64617c57-3503-427f-8ad3-9260596bf1bf',
    模範回答理由: '正解は「application.properties/yml」。Spring Bootの基礎として一般的な知識。',
    自動生成フラグ: 0,
    選択肢: [
      {
        選択肢ＩＤ: '64617c57-3503-427f-8ad3-9260596bf1bf',
        選択肢文章: 'application.properties/yml',
        回答理由: '正解候補。',
      },
      {
        選択肢ＩＤ: 'ba101282-4aa1-4087-a189-57a7109163e7',
        選択肢文章: 'boot.json',
        回答理由: '用語として不正確/未対応。',
      },
      {
        選択肢ＩＤ: '1ce40d4e-26b1-47e8-8703-acdefd76c240',
        選択肢文章: 'settings.xml',
        回答理由: '目的が異なる/非標準。',
      },
      {
        選択肢ＩＤ: 'e6d9ed84-5b80-4213-8831-a177645d2f3a',
        選択肢文章: 'config.toml',
        回答理由: '文法や用途が異なる。',
      },
    ],
  },
  {
    問題ＩＤ: 'd377f1bf-7f9d-42d3-8d38-a264bb504fe1',
    問題文章: 'Dockerでイメージからコンテナを起動するコマンドは？',
    難易度: 7,
    スキル: 'Docker',
    模範回答: '822e4e7e-ecbd-4c30-bb77-a0e59d2e9887',
    模範回答理由: '正解は「docker run」。Dockerの基礎として一般的な知識。',
    自動生成フラグ: 0,
    選択肢: [
      {
        選択肢ＩＤ: '822e4e7e-ecbd-4c30-bb77-a0e59d2e9887',
        選択肢文章: 'docker run',
        回答理由: '正解候補。',
      },
      {
        選択肢ＩＤ: '2ae750a8-28f1-44a0-9130-12efbd236b5b',
        選択肢文章: 'docker start-image',
        回答理由: '用語として不正確/未対応。',
      },
      {
        選択肢ＩＤ: 'faf6d932-23f3-4003-9660-28e7bbbd9fd9',
        選択肢文章: 'docker create-run',
        回答理由: '目的が異なる/非標準。',
      },
      {
        選択肢ＩＤ: 'b39a4b1b-8923-4f90-b215-bff80aa31eec',
        選択肢文章: 'docker exec',
        回答理由: '文法や用途が異なる。',
      },
    ],
  },
  {
    問題ＩＤ: 'eda6d7f8-05cc-4e23-9a85-ce716c7d0331',
    問題文章: 'KubernetesでPodの状態を一覧するコマンドは？',
    難易度: 8,
    スキル: 'Kubernetes',
    模範回答: '4c3a97fe-87c3-496e-86c7-e24cd7a4e11b',
    模範回答理由: '正解は「kubectl get pods」。Kubernetesの基礎として一般的な知識。',
    自動生成フラグ: 0,
    選択肢: [
      {
        選択肢ＩＤ: '4c3a97fe-87c3-496e-86c7-e24cd7a4e11b',
        選択肢文章: 'kubectl get pods',
        回答理由: '正解候補。',
      },
      {
        選択肢ＩＤ: 'b382f9f1-0612-4aa4-a19a-e7be3afb30a0',
        選択肢文章: 'kubectl ps',
        回答理由: '用語として不正確/未対応。',
      },
      {
        選択肢ＩＤ: '08304cc4-b88d-4907-9973-46f06ec838d9',
        選択肢文章: 'kubectl list pods',
        回答理由: '目的が異なる/非標準。',
      },
      {
        選択肢ＩＤ: '506ca2e2-9cb4-4721-98e6-abb9b75317c2',
        選択肢文章: 'kubectl pods',
        回答理由: '文法や用途が異なる。',
      },
    ],
  },
  {
    問題ＩＤ: 'bef72b24-8347-4459-b567-994e185eca19',
    問題文章: 'HTMLで最も大きい見出しタグは？',
    難易度: 9,
    スキル: 'HTML',
    模範回答: '5036f481-d6ad-4425-b4f3-90edc8d9feeb',
    模範回答理由: '正解は「<h1>」。HTMLの基礎として一般的な知識。',
    自動生成フラグ: 0,
    選択肢: [
      {
        選択肢ＩＤ: '5036f481-d6ad-4425-b4f3-90edc8d9feeb',
        選択肢文章: '<h1>',
        回答理由: '正解候補。',
      },
      {
        選択肢ＩＤ: 'fa022e18-2dfa-427b-ae37-9864abeb5a68',
        選択肢文章: '<header>',
        回答理由: '用語として不正確/未対応。',
      },
      {
        選択肢ＩＤ: '114d9f9e-d7e2-4e37-8020-afbd82d5a846',
        選択肢文章: '<title>',
        回答理由: '目的が異なる/非標準。',
      },
      {
        選択肢ＩＤ: '793ba08b-3060-4d2e-9c99-b02d2258a32e',
        選択肢文章: '<h6>',
        回答理由: '文法や用途が異なる。',
      },
    ],
  },
  {
    問題ＩＤ: 'b94e6d5d-3ab4-4d71-b97d-c441c4b447ea',
    問題文章: 'CSSでクラスセレクタの記法は？',
    難易度: 10,
    スキル: 'CSS',
    模範回答: '3f9603ba-c994-4ac5-9507-51f079c0682d',
    模範回答理由: '正解は「.class」。CSSの基礎として一般的な知識。',
    自動生成フラグ: 0,
    選択肢: [
      {
        選択肢ＩＤ: '3f9603ba-c994-4ac5-9507-51f079c0682d',
        選択肢文章: '.class',
        回答理由: '正解候補。',
      },
      {
        選択肢ＩＤ: 'bbb1c4c0-c9b8-443e-92fa-13c631c5ff9a',
        選択肢文章: '#class',
        回答理由: '用語として不正確/未対応。',
      },
      {
        選択肢ＩＤ: 'e8219e3b-facb-4962-aaff-4c0c12446fd1',
        選択肢文章: 'class:',
        回答理由: '目的が異なる/非標準。',
      },
      {
        選択肢ＩＤ: '1a9165d6-4927-4b46-8c34-ef75fdd58e8b',
        選択肢文章: '@class',
        回答理由: '文法や用途が異なる。',
      },
    ],
  },
  {
    問題ＩＤ: 'a21bc763-b52d-48f6-81bf-bfc8d73b73a8',
    問題文章: 'Javaでオブジェクト内容の比較に使うべきメソッドは？',
    難易度: 1,
    スキル: 'Java',
    模範回答: 'b609e258-a731-44cf-981c-fcfebb3358cf',
    模範回答理由: '正解は「equals()」。Javaの基礎として一般的な知識。',
    自動生成フラグ: 0,
    選択肢: [
      {
        選択肢ＩＤ: 'b609e258-a731-44cf-981c-fcfebb3358cf',
        選択肢文章: 'equals()',
        回答理由: '正解候補。',
      },
      {
        選択肢ＩＤ: '41c3fa20-7671-433d-b133-a2a52709e113',
        選択肢文章: '==',
        回答理由: '用語として不正確/未対応。',
      },
      {
        選択肢ＩＤ: '02cc0f7f-f3e1-4a2e-af4a-17ea24b3e993',
        選択肢文章: 'compareTo()',
        回答理由: '目的が異なる/非標準。',
      },
      {
        選択肢ＩＤ: '7b75685c-cf90-486c-8582-b7374b9d8030',
        選択肢文章: 'hashCode()',
        回答理由: '文法や用途が異なる。',
      },
    ],
  },
  {
    問題ＩＤ: '99fb6d4e-1d0f-4dcc-b75c-2e7698af24c0',
    問題文章: 'Pythonでリストの長さを取得するビルトイン関数は？',
    難易度: 2,
    スキル: 'Python',
    模範回答: '6767e7d0-8059-4e65-b3f6-1eae4faacd11',
    模範回答理由: '正解は「len()」。Pythonの基礎として一般的な知識。',
    自動生成フラグ: 0,
    選択肢: [
      {
        選択肢ＩＤ: '6767e7d0-8059-4e65-b3f6-1eae4faacd11',
        選択肢文章: 'len()',
        回答理由: '正解候補。',
      },
      {
        選択肢ＩＤ: '90596f82-6163-4a70-8126-101a08117999',
        選択肢文章: 'size()',
        回答理由: '用語として不正確/未対応。',
      },
      {
        選択肢ＩＤ: 'b63e8544-d0cb-4042-b021-192211c9917a',
        選択肢文章: 'count()',
        回答理由: '目的が異なる/非標準。',
      },
      {
        選択肢ＩＤ: '943ccc26-86e4-4036-83e3-b78f4408b562',
        選択肢文章: 'length()',
        回答理由: '文法や用途が異なる。',
      },
    ],
  },
  {
    問題ＩＤ: 'a3b122ce-7a53-4c58-a96d-614f9c073a6a',
    問題文章: 'Vue.jsで双方向バインディングを行うディレクティブは？',
    難易度: 3,
    スキル: 'VueJS',
    模範回答: '4f5180e3-9ee9-4d07-86a5-095f7546b8d1',
    模範回答理由: '正解は「v-model」。VueJSの基礎として一般的な知識。',
    自動生成フラグ: 0,
    選択肢: [
      {
        選択肢ＩＤ: '4f5180e3-9ee9-4d07-86a5-095f7546b8d1',
        選択肢文章: 'v-model',
        回答理由: '正解候補。',
      },
      {
        選択肢ＩＤ: 'b610e892-eb74-434d-af01-920d8e0fb040',
        選択肢文章: 'v-bind',
        回答理由: '用語として不正確/未対応。',
      },
      {
        選択肢ＩＤ: '634db8ae-6915-42bf-9634-05c49e4686c3',
        選択肢文章: 'v-if',
        回答理由: '目的が異なる/非標準。',
      },
      {
        選択肢ＩＤ: 'e8e69d69-609d-4b32-beb1-79c1a60ba036',
        選択肢文章: 'v-on',
        回答理由: '文法や用途が異なる。',
      },
    ],
  },
  {
    問題ＩＤ: '6ba3f2c1-c564-4f7c-af86-2bb949c9c7b9',
    問題文章: 'JSで配列の末尾に要素を追加するメソッドは？',
    難易度: 4,
    スキル: 'JavaScript',
    模範回答: '9b4d0f79-7a68-4c67-97cd-c46a343839bb',
    模範回答理由: '正解は「push()」。JavaScriptの基礎として一般的な知識。',
    自動生成フラグ: 0,
    選択肢: [
      {
        選択肢ＩＤ: '9b4d0f79-7a68-4c67-97cd-c46a343839bb',
        選択肢文章: 'push()',
        回答理由: '正解候補。',
      },
      {
        選択肢ＩＤ: 'dbacc338-9a18-4b71-957f-78d21a1116c0',
        選択肢文章: 'append()',
        回答理由: '用語として不正確/未対応。',
      },
      {
        選択肢ＩＤ: 'eb3408c3-624d-42b7-9df3-2027b8797729',
        選択肢文章: 'add()',
        回答理由: '目的が異なる/非標準。',
      },
      {
        選択肢ＩＤ: '5e3c000b-c289-4b0e-b510-5c5d1fee548f',
        選択肢文章: 'insert()',
        回答理由: '文法や用途が異なる。',
      },
    ],
  },
  {
    問題ＩＤ: 'd67728f7-ffb4-4aae-9b5e-1eb1f757e030',
    問題文章: 'SQLで全件取得の基本文は？',
    難易度: 5,
    スキル: 'SQL',
    模範回答: '07f80d21-4bc1-450b-b5aa-ca30fae24193',
    模範回答理由: '正解は「SELECT * FROM テーブル」。SQLの基礎として一般的な知識。',
    自動生成フラグ: 0,
    選択肢: [
      {
        選択肢ＩＤ: '07f80d21-4bc1-450b-b5aa-ca30fae24193',
        選択肢文章: 'SELECT * FROM テーブル',
        回答理由: '正解候補。',
      },
      {
        選択肢ＩＤ: '8b0b6249-4be7-4aac-8b25-83348c81038c',
        選択肢文章: 'GET ALL テーブル',
        回答理由: '用語として不正確/未対応。',
      },
      {
        選択肢ＩＤ: 'e495475d-b1c2-431c-a314-c39bd4141647',
        選択肢文章: 'FIND テーブル',
        回答理由: '目的が異なる/非標準。',
      },
      {
        選択肢ＩＤ: '04ca8460-59c4-433c-8f4b-dbfd4ad61b19',
        選択肢文章: 'LIST テーブル',
        回答理由: '文法や用途が異なる。',
      },
    ],
  },
  {
    問題ＩＤ: '40090966-ea55-4298-a7ee-541e27b22cce',
    問題文章: 'Spring Bootでアプリ設定を記述する既定ファイルは？',
    難易度: 6,
    スキル: 'Spring Boot',
    模範回答: 'ee7fe251-6584-4435-9b6a-7d8a6dec47a9',
    模範回答理由: '正解は「application.properties/yml」。Spring Bootの基礎として一般的な知識。',
    自動生成フラグ: 0,
    選択肢: [
      {
        選択肢ＩＤ: 'ee7fe251-6584-4435-9b6a-7d8a6dec47a9',
        選択肢文章: 'application.properties/yml',
        回答理由: '正解候補。',
      },
      {
        選択肢ＩＤ: 'f01a70da-62c1-4e5e-b371-b38d8c19bf3e',
        選択肢文章: 'boot.json',
        回答理由: '用語として不正確/未対応。',
      },
      {
        選択肢ＩＤ: '889653e1-c343-4875-9d12-c1e854280571',
        選択肢文章: 'settings.xml',
        回答理由: '目的が異なる/非標準。',
      },
      {
        選択肢ＩＤ: '3b538783-937c-474e-a2f2-f031410c6b02',
        選択肢文章: 'config.toml',
        回答理由: '文法や用途が異なる。',
      },
    ],
  },
  {
    問題ＩＤ: '815b0003-7ef5-4474-9f5e-401d534c65a5',
    問題文章: 'Dockerでイメージからコンテナを起動するコマンドは？',
    難易度: 7,
    スキル: 'Docker',
    模範回答: 'a603a3a0-3842-47f2-a5c2-a73470a315fd',
    模範回答理由: '正解は「docker run」。Dockerの基礎として一般的な知識。',
    自動生成フラグ: 0,
    選択肢: [
      {
        選択肢ＩＤ: 'a603a3a0-3842-47f2-a5c2-a73470a315fd',
        選択肢文章: 'docker run',
        回答理由: '正解候補。',
      },
      {
        選択肢ＩＤ: '7d634fb8-6e8f-4c16-830b-426e5c993f4a',
        選択肢文章: 'docker start-image',
        回答理由: '用語として不正確/未対応。',
      },
      {
        選択肢ＩＤ: 'c7502419-dd2f-4a41-b9e1-72e9cb68a9c0',
        選択肢文章: 'docker create-run',
        回答理由: '目的が異なる/非標準。',
      },
      {
        選択肢ＩＤ: '0ee75bc1-25e2-4ff1-9cf9-34861e91ae05',
        選択肢文章: 'docker exec',
        回答理由: '文法や用途が異なる。',
      },
    ],
  },
  {
    問題ＩＤ: '3d1063ac-3549-45e4-8e40-7357166207d0',
    問題文章: 'KubernetesでPodの状態を一覧するコマンドは？',
    難易度: 8,
    スキル: 'Kubernetes',
    模範回答: '4c458d93-45fe-4f5a-b643-0b724866b7ea',
    模範回答理由: '正解は「kubectl get pods」。Kubernetesの基礎として一般的な知識。',
    自動生成フラグ: 0,
    選択肢: [
      {
        選択肢ＩＤ: '4c458d93-45fe-4f5a-b643-0b724866b7ea',
        選択肢文章: 'kubectl get pods',
        回答理由: '正解候補。',
      },
      {
        選択肢ＩＤ: '54ea700e-0532-41ba-ad4d-c46ffb328fb8',
        選択肢文章: 'kubectl ps',
        回答理由: '用語として不正確/未対応。',
      },
      {
        選択肢ＩＤ: '0faac077-548c-49f9-a37e-d89cc4daad10',
        選択肢文章: 'kubectl list pods',
        回答理由: '目的が異なる/非標準。',
      },
      {
        選択肢ＩＤ: '18814d69-1943-4495-8e64-31068d0f22a1',
        選択肢文章: 'kubectl pods',
        回答理由: '文法や用途が異なる。',
      },
    ],
  },
  {
    問題ＩＤ: 'ab5614e6-0116-453f-927c-d7edba0d5d5c',
    問題文章: 'HTMLで最も大きい見出しタグは？',
    難易度: 9,
    スキル: 'HTML',
    模範回答: 'd6baad42-be60-47f2-aa47-80c5f3ca5cc2',
    模範回答理由: '正解は「<h1>」。HTMLの基礎として一般的な知識。',
    自動生成フラグ: 0,
    選択肢: [
      {
        選択肢ＩＤ: 'd6baad42-be60-47f2-aa47-80c5f3ca5cc2',
        選択肢文章: '<h1>',
        回答理由: '正解候補。',
      },
      {
        選択肢ＩＤ: 'b4bc29ca-dbe7-43fb-941e-07704ed0c25a',
        選択肢文章: '<header>',
        回答理由: '用語として不正確/未対応。',
      },
      {
        選択肢ＩＤ: 'a2570eb4-3849-49b7-ab59-82198d2b5451',
        選択肢文章: '<title>',
        回答理由: '目的が異なる/非標準。',
      },
      {
        選択肢ＩＤ: 'bf077916-331f-4b07-b30e-0b149c389cc2',
        選択肢文章: '<h6>',
        回答理由: '文法や用途が異なる。',
      },
    ],
  },
  {
    問題ＩＤ: '15f8ea40-db2b-46e9-b66b-3cdae87e39ae',
    問題文章: 'CSSでクラスセレクタの記法は？',
    難易度: 10,
    スキル: 'CSS',
    模範回答: 'c66ad3ee-fa29-4378-b252-590ec93c4146',
    模範回答理由: '正解は「.class」。CSSの基礎として一般的な知識。',
    自動生成フラグ: 0,
    選択肢: [
      {
        選択肢ＩＤ: 'c66ad3ee-fa29-4378-b252-590ec93c4146',
        選択肢文章: '.class',
        回答理由: '正解候補。',
      },
      {
        選択肢ＩＤ: '13487a3c-1437-437d-88c2-320f25591334',
        選択肢文章: '#class',
        回答理由: '用語として不正確/未対応。',
      },
      {
        選択肢ＩＤ: 'fbdd242d-c2e4-4b8d-878d-f762cf4c18a0',
        選択肢文章: 'class:',
        回答理由: '目的が異なる/非標準。',
      },
      {
        選択肢ＩＤ: '44bdda4d-f0d8-4ba4-b96e-2bf756220da6',
        選択肢文章: '@class',
        回答理由: '文法や用途が異なる。',
      },
    ],
  },
];

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const LS_KEY = 'pm_problems_v2';
function ensureSeed() {
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) localStorage.setItem(LS_KEY, JSON.stringify(seed));
}
function readAll(): Problem[] {
  ensureSeed();
  return JSON.parse(localStorage.getItem(LS_KEY) || '[]');
}
function writeAll(data: Problem[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(data));
}

export async function searchProblems(q: SearchQuery): Promise<PagedResult<Problem>> {
  if (!USE_MOCK) {
    const params = new URLSearchParams();
    if (q.問題ＩＤ) params.set('問題ＩＤ', q.問題ＩＤ);
    if (q.スキルＩＤ) params.set('スキルＩＤ', q.スキルＩＤ);
    if (q.問題文章) params.set('問題文章', q.問題文章);
    if (q.自動生成フラグ !== '' && q.自動生成フラグ != null)
      params.set('自動生成フラグ', String(q.自動生成フラグ));
    if (q.難易度Min != null) params.set('難易度Min', String(q.難易度Min));
    if (q.難易度Max != null) params.set('難易度Max', String(q.難易度Max));
    params.set('page', String(q.page));
    params.set('size', String(q.size));
    const res = await fetch(`${API_BASE}/problems?${params.toString()}`);
    if (!res.ok) throw new Error('検索に失敗しました');
    return await res.json();
  }
  await delay(500);
  const all = readAll();
  const filtered = all.filter((p) => {
    if (q.問題ＩＤ && p.問題ＩＤ !== q.問題ＩＤ) return false;
    if (q.スキルＩＤ && p.スキル !== q.スキルＩＤ) return false;
    if (q.問題文章 && !p.問題文章.includes(q.問題文章)) return false;
    if (
      q.自動生成フラグ !== '' &&
      q.自動生成フラグ != null &&
      p.自動生成フラグ !== Number(q.自動生成フラグ)
    )
      return false;
    if (q.難易度Min != null && p.難易度 < q.難易度Min) return false;
    if (q.難易度Max != null && p.難易度 > q.難易度Max) return false;
    return true;
  });
  const start = (q.page - 1) * q.size;
  const items = filtered.slice(start, start + q.size);
  return { items, total: filtered.length, page: q.page, size: q.size };
}

export async function getProblem(id: string): Promise<Problem> {
  if (!USE_MOCK) {
    const res = await fetch(`${API_BASE}/problems/${id}`);
    if (!res.ok) throw new Error('取得に失敗しました');
    return await res.json();
  }
  await delay(400);
  const all = readAll();
  const item = all.find((p) => p.問題ＩＤ === id);
  if (!item) throw new Error('該当データがありません');
  return item;
}

export async function saveProblem(p: Problem): Promise<void> {
  if (!USE_MOCK) {
    const res = await fetch(`${API_BASE}/problems`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(p),
    });
    if (!res.ok) throw new Error('保存に失敗しました');
    return;
  }
  const all = readAll();
  const idx = all.findIndex((x) => x.問題ＩＤ === p.問題ＩＤ);
  if (idx >= 0) all[idx] = p;
  else all.push(p);
  writeAll(all);
}

export async function createProblem(p: Omit<Problem, '問題ＩＤ'>): Promise<string> {
  if (!USE_MOCK) {
    const res = await fetch(`${API_BASE}/problems`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(p),
    });
    if (!res.ok) throw new Error('新規作成に失敗しました');
    const data = await res.json();
    return data.問題ＩＤ;
  }
  await delay(300);
  const id = uuid();
  const all = readAll();
  all.push({ ...p, 問題ＩＤ: id });
  writeAll(all);
  return id;
}

export async function deleteProblem(id: string): Promise<void> {
  if (!USE_MOCK) {
    const res = await fetch(`${API_BASE}/problems/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('削除に失敗しました');
    return;
  }
  await delay(300);
  const all = readAll();
  const next = all.filter((p) => p.問題ＩＤ !== id);
  writeAll(next);
}

export async function aiGenerateProblem(base?: Partial<Problem>): Promise<Problem> {
  if (!USE_MOCK) {
    const res = await fetch(`${API_BASE}/problems/ai-generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(base || {}),
    });
    if (!res.ok) throw new Error('AI生成に失敗しました');
    return await res.json();
  }
  await delay(600);
  const choice1 = uuid(),
    choice2 = uuid(),
    choice3 = uuid(),
    choice4 = uuid();
  return {
    問題ＩＤ: '',
    問題文章: base?.問題文章 || 'JavaScriptで配列の長さを得るプロパティはどれ？',
    難易度: base?.難易度 ?? 2,
    スキル: base?.スキル || 'JavaScript',
    模範回答: choice1,
    模範回答理由: '配列の要素数はlengthプロパティで参照するため。',
    自動生成フラグ: 0,
    選択肢: [
      { 選択肢ＩＤ: choice1, 選択肢文章: 'length', 回答理由: '要素数取得用の標準プロパティ。' },
      { 選択肢ＩＤ: choice2, 選択肢文章: 'size', 回答理由: 'JS配列には存在しない。' },
      { 選択肢ＩＤ: choice3, 選択肢文章: 'count', 回答理由: '標準では存在しない。' },
      { 選択肢ＩＤ: choice4, 選択肢文章: 'length()', 回答理由: '関数ではなくプロパティ。' },
    ],
  };
}
