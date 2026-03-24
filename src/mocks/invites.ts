export interface Invite {
  invite_id: string;
  from_user_id: string;
  to_user_id: string;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  created_at: string;
  updated_at: string;
}

export const mockInvites: Invite[] = [
  {
    invite_id: 'INV_001',
    from_user_id: 'U002',
    to_user_id: 'U001',
    status: 'pending',
    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    invite_id: 'INV_002',
    from_user_id: 'U003',
    to_user_id: 'U001',
    status: 'accepted',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    invite_id: 'INV_003',
    from_user_id: 'U001',
    to_user_id: 'U004',
    status: 'rejected',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
  }
];
