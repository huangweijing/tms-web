export type Personnel = {
  人材ID: string;
  所属会社: string;
  名前: string;
  社員番号: string;
  生年月日: string;
  現案件終了年月日: string;
  BPフラグ: number;
  削除フラグ: number;
};

export type PageResponse<T> = {
  items: T[];
  page: number;
  size: number;
  total: number;
};

export interface Skill {
  スキルＩＤ: string;
  スキル名: string;
  スキル点数: number;
  __isNew?: boolean;
  __isEdited?: boolean;
  __isDeleted?: boolean;
}
export interface SkillPayload {
  人材ＩＤ: string;
  スキル: Skill[];
}
