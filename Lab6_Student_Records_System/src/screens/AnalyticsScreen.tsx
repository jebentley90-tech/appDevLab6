import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useStudents } from '../context/StudentContext';
import { getAnalytics } from '../utils/analytics';

function StatCard({ title, value }: { title: string; value: string | number}) {
    return (
        <View
            style={{
                backgroundColor: 'white',
                borderRadius: 16,
                padding: 16,
                marginBottom: 12,
            }}
        >
            <Text style={{ color: '#666' }}>{title}</Text>
            <Text style={{ fontSize: 22, fontWeight: '800', marginTop: 6}}>{value}</Text>
        </View>
    );
}

export function AnalyticsScreen() {
    const { students } = useStudents();
    const analytics = getAnalytics(students);

    return (
        <ScrollView contentContainerStyle={{ padding: 16, backgroundColor: '#F5F7FB'}}>
            <Text style={{ fontSize: 28, fontWeight: '800', marginBottom: 12 }}>Analytics</Text>

            <StatCard title="Total Students" value={analytics.totalStudents} />
            <StatCard title="Average GPA" value={analytics.averageGPA} />
            <StatCard title="Highest Performer"
                      value={analytics.highestPerformingStudent ? `${analytics.highestPerformingStudent.name} (${analytics.highestPerformingStudent.gpa.toFixed(2)})` : 'N/A'}
            />
            <StatCard title="Students With Holds" value={analytics.holdCount} />

            <View style={{ backgroundColor: 'white', borderRadius: 16, padding: 16, marginBottom: 12 }}>
                <Text style={{ fontWeight: '800', fontSize: 18, marginBottom: 8 }}>Standing Distribution</Text>
                {Object.entries(analytics.standingDistribution).map(([standing, count]) => (
                    <Text key={standing}>{standing}: {count}</Text>
                ))}
            </View>

            <View style={{ backgroundColor: 'white', borderRadius: 16, padding: 16}}>
                <Text style={{ fontWeight: '800', fontSize: 18, marginBottom: 8 }}>By Major</Text>
                {analytics.majorStats.map((item) => (
                    <Text key={item.major}>
                        {item.major}: {item.count} students, Avg GPA {item.averageGPA}
                    </Text>
                    ))}
            </View>
        </ScrollView>
    )
}
