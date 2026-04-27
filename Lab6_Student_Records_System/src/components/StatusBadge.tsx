import React from 'react';
import { Text, View } from 'react-native';

type Props = {
    label: string,
    tone?: 'default' | 'danger' | 'warning' | 'success';
};

export function StatusBadge({ label, tone = 'default' }: Props) {
    const backgroundColor =
        tone === 'danger' ? '#FDE2E2' : tone === 'warning' ? '#FFF4CC' : tone === 'success' ? '#DFF6E0' : '#E8E8E8';

    return (
        <View
            style={{
                backgroundColor,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 999,
                marginRight: 8,
                marginBottom: 8,
            }}
        >
            <Text style={{ fontSize: 12, fontWeight: '600' }}>{label}</Text>
        </View>
    );
}