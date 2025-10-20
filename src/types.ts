export interface PersonRaw {
  人材ID: string;
  所属会社: string;
  名前: string;
  社員番号: string;
  生年月日: string; // YYYYMMDD
  現案件終了年月日: string; // YYYYMMDD
  BPフラグ: number; // 0/1
  削除フラグ: number; // 0/1
}

export interface SearchParams {
  キーワード?: string; // フリーワード（会社/名前/社員番号に部分一致）
  所属会社?: string;
  名前?: string;
  社員番号?: string;
  BPフラグ?: number | '';
  削除フラグ?: number | '';
}

export interface PagedResponse<T> {
  data: T[];
  total: number; // 全件数
  page: number; // 1始まり
  size: number; // ページサイズ
}

export interface Choice {
  選択肢ＩＤ: string;
  選択肢文章: string;
  回答理由: string;
}

export interface Problem {
  問題ＩＤ: string;
  問題文章: string;
  難易度: number;
  スキル: string;
  模範回答: string;
  模範回答理由: string;
  自動生成フラグ: number;
  選択肢: Choice[];
}

export interface SearchQuery {
  問題ＩＤ?: string;
  スキルＩＤ?: string;
  難易度Min?: number;
  難易度Max?: number;
  自動生成フラグ?: number | '';
  問題文章?: string;
  page: number;
  size: number;
}

export interface PagedResult<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
}
