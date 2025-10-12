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