import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { about } from '../../constants/pages/home/about';

interface ILanguage {
	language: string;
}

const About: React.FC<ILanguage> = ({ language }) => {
	return (
		<View
			style={{
				width: '100%',
				minHeight: 420,
				justifyContent: 'center',
				alignItems: 'center',
				position: 'relative',
				overflow: 'hidden',
				paddingVertical: 32,
			}}
		>
			{/* Gradient background overlay */}
			<LinearGradient
				colors={['#FFD600', '#000000', '#000000']}
				start={{ x: 0.5, y: 1 }}
				end={{ x: 0.5, y: 0 }}
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					width: '100%',
					height: '100%',
					zIndex: -1,
				}}
				pointerEvents="none"
			/>
			<Text className="text-yellow-400 text-3xl font-bold text-center mb-6">
				{about.aboutUs[language]}
			</Text>
			<View className="flex-row items-start max-w-5xl mx-auto w-11/12 gap-5">
				<View className="flex flex-col justify-center items-center mt-5">
					{/* Arrow shape */}
					<View
						style={{
							width: 0,
							height: 0,
							borderTopWidth: 20,
							borderTopColor: 'transparent',
							borderRightWidth: 30,
							borderRightColor: '#FFD600',
							borderBottomWidth: 20,
							borderBottomColor: 'transparent',
							borderLeftWidth: 0,
							borderLeftColor: 'transparent',
						}}
					/>
					{/* Simulated vertical gradient bar */}
					<View
						className="w-1 mt-1 rounded"
						style={{
							height: Dimensions.get('window').height * 0.25,
							backgroundColor: '#FFD600',
							opacity: 0.7,
						}}
					/>
				</View>
				<View className="flex-1 justify-center">
					<Text className="text-yellow-400 text-xl font-semibold mb-2">
						{about.whatIs[language]}
					</Text>
					<Text className="mt-4 text-white text-base font-bold leading-7 max-w-3xl">
						{about.desc[language]}
					</Text>
				</View>
			</View>
		</View>
	);
};

export default About;
