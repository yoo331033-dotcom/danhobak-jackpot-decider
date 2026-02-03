import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ResultsModal = ({ visible, winner, onClose }) => {
    const emojis = ['🎃', '🔥', '✨', '💎', '🎰', '💖', '🚀', '🤑', '🌈'];

    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.overlay}>
                {/* 컨페티 이모지 */}
                {Array.from({ length: 12 }).map((_, i) => (
                    <Text
                        key={i}
                        style={[
                            styles.confetti,
                            {
                                left: `${Math.random() * 80 + 10}%`,
                                top: `${Math.random() * 60 + 10}%`,
                                transform: [{ rotate: `${Math.random() * 40 - 20}deg` }]
                            }
                        ]}
                    >
                        {emojis[i % emojis.length]}
                    </Text>
                ))}

                {/* 메인 카드 */}
                <View style={styles.card}>
                    {/* 상단 배너 */}
                    <View style={styles.banner}>
                        <Text style={styles.bannerText}>🎰 JACKPOT! • YOU GOT LUCKY! • BEST CHOICE! 🎰</Text>
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.subtitle}>오늘의 운명은?</Text>

                        <View style={styles.winnerBox}>
                            <Text style={styles.winner}>{winner}</Text>
                            <Text style={styles.emojiLeft}>🤟</Text>
                            <Text style={styles.emojiRight}>🔥</Text>
                        </View>

                        <View style={styles.buttons}>
                            <TouchableOpacity style={styles.primaryBtn} onPress={onClose}>
                                <Text style={styles.primaryBtnText}>한 번 더!</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.secondaryBtn}>
                                <Text style={styles.secondaryBtnText}>📤 인증하기</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.disclaimer}>*결과에 불복 시 호박이 됨 (진짜임)</Text>
                    </View>

                    {/* 장식 */}
                    <View style={styles.decorPink} />
                    <View style={styles.decorBlue} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    confetti: {
        position: 'absolute',
        fontSize: 30,
        zIndex: 1,
    },
    card: {
        width: width - 40,
        maxWidth: 380,
        backgroundColor: '#fff',
        borderWidth: 8,
        borderColor: '#000',
        borderRadius: 30,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 12, height: 12 },
        shadowOpacity: 1,
        shadowRadius: 0,
        zIndex: 10,
    },
    banner: {
        backgroundColor: '#000',
        paddingVertical: 8,
        overflow: 'hidden',
    },
    bannerText: {
        color: '#ccff00',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1,
        textAlign: 'center',
    },
    content: {
        backgroundColor: '#f0f0f0',
        padding: 25,
        alignItems: 'center',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ff0099',
        marginBottom: 20,
    },
    winnerBox: {
        position: 'relative',
        marginBottom: 30,
    },
    winner: {
        fontSize: 60,
        fontWeight: '900',
        fontStyle: 'italic',
        color: '#000',
        letterSpacing: -3,
    },
    emojiLeft: {
        position: 'absolute',
        top: -15,
        right: -40,
        fontSize: 35,
    },
    emojiRight: {
        position: 'absolute',
        bottom: -15,
        left: -40,
        fontSize: 35,
    },
    buttons: {
        width: '100%',
        gap: 12,
    },
    primaryBtn: {
        backgroundColor: '#ccff00',
        paddingVertical: 18,
        borderRadius: 15,
        borderWidth: 4,
        borderColor: '#000',
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        alignItems: 'center',
    },
    primaryBtnText: {
        fontSize: 22,
        fontWeight: '900',
        color: '#000',
    },
    secondaryBtn: {
        backgroundColor: '#00f0ff',
        paddingVertical: 15,
        borderRadius: 15,
        borderWidth: 4,
        borderColor: '#000',
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        alignItems: 'center',
    },
    secondaryBtnText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    disclaimer: {
        marginTop: 20,
        fontSize: 12,
        color: '#888',
        fontStyle: 'italic',
    },
    decorPink: {
        position: 'absolute',
        bottom: -15,
        right: -15,
        width: 50,
        height: 50,
        backgroundColor: '#ff0099',
        borderRadius: 25,
        borderWidth: 4,
        borderColor: '#000',
        zIndex: -1,
    },
    decorBlue: {
        position: 'absolute',
        top: 40,
        left: -15,
        width: 40,
        height: 40,
        backgroundColor: '#00f0ff',
        borderWidth: 4,
        borderColor: '#000',
        transform: [{ rotate: '45deg' }],
        zIndex: -1,
    },
});

export default ResultsModal;
