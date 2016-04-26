//
//  ViewController.h
//  Sketch2CodeTest
//
//  Created by Peter Wiesner on 11/04/16.
//  Copyright © 2016 Peter Wiesner. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "PriceView.h"

@interface ViewController : UIViewController
{
    PriceView *_price;
    NSTimer *_invalidateLayoutTimer;
}

@end

