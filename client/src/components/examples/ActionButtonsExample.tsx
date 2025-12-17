import ActionButtons from '../ActionButtons';

export default function ActionButtonsExample() {
  return (
    <div className="flex min-h-[200px] items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <ActionButtons
        onLike={() => console.log('Liked!')}
        onDislike={() => console.log('Disliked!')}
        onReset={() => console.log('Reset!')}
        showReset={true}
      />
    </div>
  );
}
