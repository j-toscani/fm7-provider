export default [
  { encoding: "s32", property: "isRaceOn" },
  { encoding: "u32", property: "timestampMS" },
  { encoding: "f32", property: "engineMaxRpm" },
  { encoding: "f32", property: "engineIdleRpm" },
  { encoding: "f32", property: "currentEngineRpm" },
  { encoding: "f32", property: "accelerationX" },
  { encoding: "f32", property: "accelerationY" },
  { encoding: "f32", property: "accelerationZ" },
  { encoding: "f32", property: "velocityX" },
  { encoding: "f32", property: "velocityY" },
  { encoding: "f32", property: "velocityZ" },
  { encoding: "f32", property: "angularVelocityX" },
  { encoding: "f32", property: "angularVelocityY" },
  { encoding: "f32", property: "angularVelocityZ" },
  { encoding: "f32", property: "yaw" },
  { encoding: "f32", property: "pitch" },
  { encoding: "f32", property: "roll" },
  { encoding: "f32", property: "normalizedSuspensionTravelFrontLeft" },
  { encoding: "f32", property: "normalizedSuspensionTravelFrontRight" },
  { encoding: "f32", property: "normalizedSuspensionTravelRearLeft" },
  { encoding: "f32", property: "normalizedSuspensionTravelRearRight" },
  { encoding: "f32", property: "tireSlipRatioFrontLeft" },
  { encoding: "f32", property: "tireSlipRatioFrontRight" },
  { encoding: "f32", property: "tireSlipRatioRearLeft" },
  { encoding: "f32", property: "tireSlipRatioRearRight" },
  { encoding: "f32", property: "wheelRotationSpeedFrontLeft" },
  { encoding: "f32", property: "wheelRotationSpeedFrontRight" },
  { encoding: "f32", property: "wheelRotationSpeedRearLeft" },
  { encoding: "f32", property: "wheelRotationSpeedRearRight" },
  { encoding: "s32", property: "wheelOnRumbleStripFrontLeft" },
  { encoding: "s32", property: "wheelOnRumbleStripFrontRight" },
  { encoding: "s32", property: "wheelOnRumbleStripRearLeft" },
  { encoding: "s32", property: "wheelOnRumbleStripRearRight" },
  { encoding: "f32", property: "wheelInPuddleDepthFrontLeft" },
  { encoding: "f32", property: "wheelInPuddleDepthFrontRight" },
  { encoding: "f32", property: "wheelInPuddleDepthRearLeft" },
  { encoding: "f32", property: "wheelInPuddleDepthRearRight" },
  { encoding: "f32", property: "surfaceRumbleFrontLeft" },
  { encoding: "f32", property: "surfaceRumbleFrontRight" },
  { encoding: "f32", property: "surfaceRumbleRearLeft" },
  { encoding: "f32", property: "surfaceRumbleRearRight" },
  { encoding: "f32", property: "tireSlipAngleFrontLeft" },
  { encoding: "f32", property: "tireSlipAngleFrontRight" },
  { encoding: "f32", property: "tireSlipAngleRearLeft" },
  { encoding: "f32", property: "tireSlipAngleRearRight" },
  { encoding: "f32", property: "tireCombinedSlipFrontLeft" },
  { encoding: "f32", property: "tireCombinedSlipFrontRight" },
  { encoding: "f32", property: "tireCombinedSlipRearLeft" },
  { encoding: "f32", property: "tireCombinedSlipRearRight" },
  { encoding: "f32", property: "suspensionTravelMetersFrontLeft" },
  { encoding: "f32", property: "suspensionTravelMetersFrontRight" },
  { encoding: "f32", property: "suspensionTravelMetersRearLeft" },
  { encoding: "f32", property: "suspensionTravelMetersRearRight" },
  { encoding: "s32", property: "carOrdinal" },
  { encoding: "s32", property: "carClass" },
  { encoding: "s32", property: "carPerformanceIndex" },
  { encoding: "s32", property: "drivetrainType" },
  { encoding: "s32", property: "numCylinders" },
] as const;