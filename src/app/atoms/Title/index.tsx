import React, { useCallback } from 'react';
import cx from 'classnames';

type Props = {
	children: React.ReactNode;
};

export function BigTitle(props: Props) {
	return <h1 className="text-4xl font-bold text-center text-white py-8">Initial setup</h1>;
}
