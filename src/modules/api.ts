import type { PageResponse, Personnel } from './types';

const BASE = import.meta.env.VITE_API_BASE || '/api';
const USE_MOCK = (import.meta.env.VITE_USE_MOCK || 'false').toLowerCase() === 'true';

let mock: Personnel[] = [];
async function loadMock() {
  if (mock.length) return;
  const data = await fetch('/src/modules/mockData.json');
  mock = await data.json();
}

type Query = { page?: number; size?: number; keyword?: string; bp?: number | undefined };

export const Api = {
  async list(q: Query): Promise<PageResponse<Personnel>> {
    if (!USE_MOCK) {
      const params = new URLSearchParams();
      if (q.page) params.set('page', String(q.page));
      if (q.size) params.set('size', String(q.size));
      if (q.keyword) params.set('keyword', q.keyword);
      if (q.bp !== undefined) params.set('bp', String(q.bp));
      const res = await fetch(`${BASE}/personnel?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch list');
      return await res.json();
    } else {
      await loadMock();
      const { page = 1, size = 10, keyword, bp } = q;
      let data = [...mock];
      if (keyword) {
        const kw = keyword.toLowerCase();
        data = data.filter(
          (x) => x.名前.toLowerCase().includes(kw) || x.所属会社.toLowerCase().includes(kw)
        );
      }
      if (bp !== undefined) data = data.filter((x) => x.BPフラグ === bp);
      const total = data.length;
      const start = (page - 1) * size;
      const items = data.slice(start, start + size);
      return { items, page, size, total };
    }
  },

  async create(p: Omit<Personnel, '人材ID'> & { 人材ID?: string }): Promise<Personnel> {
    if (!USE_MOCK) {
      const res = await fetch(`${BASE}/personnel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(p),
      });
      if (!res.ok) throw new Error('Failed to create');
      return await res.json();
    } else {
      await loadMock();
      const id = crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);
      const created: Personnel = { ...p, 人材ID: id } as Personnel;
      mock.unshift(created);
      return created;
    }
  },

  async update(id: string, p: Partial<Personnel>): Promise<Personnel> {
    if (!USE_MOCK) {
      const res = await fetch(`${BASE}/personnel/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(p),
      });
      if (!res.ok) throw new Error('Failed to update');
      return await res.json();
    } else {
      await loadMock();
      const i = mock.findIndex((x) => x.人材ID === id);
      if (i >= 0) {
        mock[i] = { ...mock[i], ...p, 人材ID: id };
        return mock[i];
      }
      throw new Error('not found');
    }
  },

  async remove(id: string): Promise<void> {
    if (!USE_MOCK) {
      const res = await fetch(`${BASE}/personnel/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
    } else {
      await loadMock();
      mock = mock.filter((x) => x.人材ID !== id);
    }
  },
};

import type { SkillPayload, Skill } from './types';

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

// --- Mock DB in-memory for demo ---
const DB = new Map<string, Skill[]>();

export async function fetchSkillsByTalentId(talentId: string): Promise<SkillPayload> {
  // Simulate HTTP request
  await sleep(300);
  let rows = DB.get(talentId);
  if (!rows) {
    // seed with sample if not exists
    rows = [
      { スキルＩＤ: crypto.randomUUID(), スキル名: 'Java', スキル点数: 85 },
      { スキルＩＤ: crypto.randomUUID(), スキル名: 'Spring Boot', スキル点数: 78 },
      { スキルＩＤ: crypto.randomUUID(), スキル名: 'Vue.js', スキル点数: 88 },
      { スキルＩＤ: crypto.randomUUID(), スキル名: 'TypeScript', スキル点数: 80 },
      { スキルＩＤ: crypto.randomUUID(), スキル名: 'SQL', スキル点数: 92 },
    ];
    DB.set(talentId, rows);
  }
  return { 人材ＩＤ: talentId, スキル: JSON.parse(JSON.stringify(rows)) };
}

// Save only edited/added/deleted rows
export async function saveSkills(talentId: string, changed: Skill[]): Promise<void> {
  await sleep(400);
  const current = DB.get(talentId) || [];
  // apply deletions
  const deletedIds = new Set(changed.filter((s) => s.__isDeleted).map((s) => s.スキルＩＤ));
  let next = current.filter((s) => !deletedIds.has(s.スキルＩＤ));

  // upsert edited/new rows
  for (const s of changed) {
    if (s.__isDeleted) continue;
    const idx = next.findIndex((r) => r.スキルＩＤ === s.スキルＩＤ);
    const clean: Skill = {
      スキルＩＤ: s.スキルＩＤ,
      スキル名: s.スキル名,
      スキル点数: Number(s.スキル点数),
    };
    if (idx >= 0) next[idx] = clean;
    else next.push(clean);
  }
  DB.set(talentId, next);
}

/**
 * For real backend, replace above with:
 * export async function fetchSkillsByTalentId(id: string) {
 *   const res = await fetch(`/api/skills/${id}`)
 *   return await res.json()
 * }
 * export async function saveSkills(id: string, skills: Skill[]) {
 *   await fetch(`/api/skills/${id}`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ 人材ＩＤ:id, スキル: skills }) })
 * }
 */
