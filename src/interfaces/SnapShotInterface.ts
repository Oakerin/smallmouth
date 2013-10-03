///<reference path="SmallMouthInterface"/>

module SmallMouth {
	export interface SnapShotInterface {
		val(): any;
		child(path: string): SnapShotInterface;
		forEach(childAction: (childSnapshot: SnapShotInterface) => any): boolean;	
		hasChild( childPath: string ): boolean;
		hasChildren(): boolean;
		name(): string;
		numChildren(): number;
		ref(): SmallMouth.SmallMouthInterface;
		getPriority(): any;
		exportVal(): any;
	}	
}
