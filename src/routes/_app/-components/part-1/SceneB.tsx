import DynamicPositionTag from '@/components/DynamicPositionTag'

/**
 *
 * 참고용
 */
export default function SceneB() {
  return (
    <DynamicPositionTag
      layoutId="party1"
      title="#파티2"
      className="absolute top-1/2 left-1/2 text-4xl font-bold translate-x-[-50%] translate-y-[-50%]"
      className2="absolute top-4 left-4 text-sm font-semibold"
    />
  )
}
