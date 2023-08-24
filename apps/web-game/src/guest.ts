import React from 'react';

function useQuery() {
  return new URLSearchParams(window.location.search);
}

export function useIsGuestQuery() {
	const query = useQuery();
	return query.get('guest') === '1';
}
