import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

const ITEM_HEIGHT = 100;

const Reel = ({ options, isSpinning, result }) => {
    const offset = useRef(new Animated.Value(0)).current;
    const spinAnimation = useRef(null);

    const pool = Array(20).fill(options).flat();

    useEffect(() => {
        if (isSpinning) {
            if (spinAnimation.current) {
                spinAnimation.current.stop();
            }

            const oneLoopHeight = options.length * ITEM_HEIGHT;

            const spin = () => {
                offset.setValue(0);
                spinAnimation.current = Animated.timing(offset, {
                    toValue: -oneLoopHeight,
                    duration: 250,
                    easing: Easing.linear,
                    useNativeDriver: true,
                });
                spinAnimation.current.start(({ finished }) => {
                    if (finished) {
                        spin();
                    }
                });
            };
            spin();
        } else if (result) {
            if (spinAnimation.current) {
                spinAnimation.current.stop();
            }

            const targetBaseIndex = 10 * options.length;
            const resultIndex = options.indexOf(result);
            const finalIndex = targetBaseIndex + (resultIndex >= 0 ? resultIndex : 0);
            const targetPos = -(finalIndex * ITEM_HEIGHT);

            Animated.spring(offset, {
                toValue: targetPos,
                damping: 12,
                stiffness: 80,
                useNativeDriver: true,
            }).start();
        }

        return () => {
            if (spinAnimation.current) {
                spinAnimation.current.stop();
            }
        };
    }, [isSpinning, result, options]);

    return (
        <View style={styles.reelWrapper}>
            <View style={styles.reelContainer}>
                <Animated.View style={{ transform: [{ translateY: offset }] }}>
                    {pool.map((item, index) => (
                        <View key={index} style={styles.item}>
                            <Text style={styles.itemText} numberOfLines={1} adjustsFontSizeToFit>{item}</Text>
                        </View>
                    ))}
                </Animated.View>
            </View>
            {/* 상하 그라데이션 오버레이 */}
            <View style={styles.gradientTop} />
            <View style={styles.gradientBottom} />
        </View>
    );
};

const SlotMachine = ({ options, isSpinning, result, onOptionChange }) => {
    return (
        <View style={styles.container}>
            {/* 상단 캡 */}
            <View style={styles.topCap}>
                <View style={styles.ledRow}>
                    <View style={[styles.led, isSpinning ? styles.ledGreen : styles.ledRed]} />
                    <View style={[styles.led, styles.ledGray]} />
                </View>
                <View style={styles.statusRow}>
                    <Text style={styles.statusText}>SYNC_OK</Text>
                    <Text style={[styles.statusText, isSpinning ? styles.statusPink : styles.statusGreen]}>READY</Text>
                </View>
            </View>

            {/* 슬롯 릴 영역 */}
            <View style={styles.reelsContainer}>
                <View style={styles.reelsRow}>
                    <Reel options={options} isSpinning={isSpinning} result={result} />
                    <Reel options={options} isSpinning={isSpinning} result={result} />
                    <Reel options={options} isSpinning={isSpinning} result={result} />
                </View>
            </View>

            {/* JACKPOT 데코 바 */}
            <View style={styles.decorBar}>
                <Text style={styles.decorText}>🎰 DANHOBAK JACKPOT 🎰</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        maxWidth: 350,
        backgroundColor: '#fff',
        borderWidth: 5,
        borderColor: '#000',
        borderRadius: 24,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 8, height: 8 },
        shadowOpacity: 1,
        shadowRadius: 0,
    },
    topCap: {
        backgroundColor: '#000',
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 3,
        borderBottomColor: '#000',
    },
    ledRow: {
        flexDirection: 'row',
        gap: 6,
    },
    led: {
        width: 10,
        height: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    ledGreen: {
        backgroundColor: '#ccff00',
    },
    ledRed: {
        backgroundColor: '#ff4444',
    },
    ledGray: {
        backgroundColor: '#555',
    },
    statusRow: {
        flexDirection: 'row',
        gap: 15,
    },
    statusText: {
        fontSize: 8,
        fontWeight: 'bold',
        color: 'rgba(255,255,255,0.5)',
        letterSpacing: 2,
    },
    statusGreen: {
        color: '#ccff00',
    },
    statusPink: {
        color: '#ff0099',
    },
    reelsContainer: {
        backgroundColor: '#ddd',
        padding: 8,
        borderBottomWidth: 3,
        borderBottomColor: '#000',
    },
    reelsRow: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderWidth: 3,
        borderColor: '#000',
        borderRadius: 8,
        overflow: 'hidden',
        height: ITEM_HEIGHT,
    },
    reelWrapper: {
        flex: 1,
        height: ITEM_HEIGHT,
        borderRightWidth: 2,
        borderRightColor: '#000',
        overflow: 'hidden',
        backgroundColor: '#fff',
        position: 'relative',
    },
    reelContainer: {
    },
    item: {
        height: ITEM_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    itemText: {
        fontSize: 28,
        fontWeight: '900',
        fontStyle: 'italic',
        color: '#000',
        letterSpacing: -1,
    },
    gradientTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 20,
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    gradientBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 20,
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    decorBar: {
        backgroundColor: '#ccff00',
        padding: 10,
        alignItems: 'center',
        borderTopWidth: 3,
        borderTopColor: '#000',
    },
    decorText: {
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 2,
        color: '#000',
    },
});

export default SlotMachine;
