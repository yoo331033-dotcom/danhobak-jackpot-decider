import React, { useRef } from 'react';
import { StyleSheet, View, Text, Animated, PanResponder } from 'react-native';

const Lever = ({ onPull, isSpinning }) => {
    const rotation = useRef(new Animated.Value(0)).current;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => !isSpinning,
            onMoveShouldSetPanResponder: () => !isSpinning,
            onPanResponderMove: (_, gestureState) => {
                if (isSpinning) return;
                const deg = Math.max(0, Math.min(gestureState.dy * 0.6, 100));
                rotation.setValue(deg);
            },
            onPanResponderRelease: () => {
                rotation.stopAnimation((currentValue) => {
                    if (currentValue > 60) {
                        onPull();
                    }
                    Animated.spring(rotation, {
                        toValue: 0,
                        damping: 12,
                        stiffness: 100,
                        useNativeDriver: true,
                    }).start();
                });
            },
        })
    ).current;

    const animatedStyle = {
        transform: [
            {
                rotateX: rotation.interpolate({
                    inputRange: [0, 100],
                    outputRange: ['0deg', '100deg'],
                })
            }
        ],
    };

    return (
        <View style={styles.container}>
            {/* 안내 텍스트 */}
            {!isSpinning && (
                <View style={styles.guide}>
                    <Text style={styles.guideText}>PULL!</Text>
                </View>
            )}

            <View style={styles.touchArea} {...panResponder.panHandlers}>
                {/* 피벗 소켓 */}
                <View style={styles.socket}>
                    <View style={styles.innerSocket}>
                        <View style={styles.innerCore} />
                    </View>
                </View>

                {/* 레버 암 */}
                <Animated.View style={[styles.armWrapper, animatedStyle]}>
                    {/* 볼 */}
                    <View style={styles.ball}>
                        <View style={styles.ballHighlight} />
                        <Text style={styles.emoji}>🎰</Text>
                    </View>
                    {/* 스틱 */}
                    <View style={styles.stick}>
                        <View style={styles.stickShine} />
                    </View>
                    {/* 바닥판 */}
                    <View style={styles.baseplate} />
                </Animated.View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 280,
        width: 90,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    touchArea: {
        width: 100,
        height: 280,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    guide: {
        position: 'absolute',
        top: 10,
        backgroundColor: '#ff0099',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: '#000',
        zIndex: 100,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 0,
    },
    guideText: {
        color: '#fff',
        fontWeight: '900',
        fontSize: 11,
        letterSpacing: 2,
    },
    socket: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#333',
        borderWidth: 4,
        borderColor: '#000',
        position: 'absolute',
        bottom: 10,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
    },
    innerSocket: {
        width: 45,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#111',
        borderWidth: 3,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCore: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#444',
        borderWidth: 2,
        borderColor: '#222',
    },
    armWrapper: {
        position: 'absolute',
        bottom: 45,
        height: 200,
        width: 80,
        alignItems: 'center',
        justifyContent: 'flex-start',
        zIndex: 10,
    },
    ball: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#ff0000',
        borderWidth: 5,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        zIndex: 20,
    },
    ballHighlight: {
        position: 'absolute',
        top: 10,
        left: 15,
        width: 20,
        height: 15,
        backgroundColor: 'rgba(255,255,255,0.4)',
        borderRadius: 10,
    },
    emoji: {
        fontSize: 32,
    },
    stick: {
        width: 22,
        height: 120,
        backgroundColor: '#ccc',
        borderWidth: 4,
        borderColor: '#000',
        borderRadius: 5,
        marginTop: -5,
        zIndex: 5,
        overflow: 'hidden',
    },
    stickShine: {
        position: 'absolute',
        left: 2,
        top: 0,
        bottom: 0,
        width: 6,
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    baseplate: {
        width: 35,
        height: 15,
        backgroundColor: '#555',
        borderWidth: 3,
        borderColor: '#000',
        borderRadius: 5,
        marginTop: -5,
    },
});

export default Lever;
