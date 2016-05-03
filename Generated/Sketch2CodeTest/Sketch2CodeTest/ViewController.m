//
//  ViewController.m
//  Sketch2CodeTest
//
//  Created by Peter Wiesner on 11/04/16.
//  Copyright © 2016 Peter Wiesner. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    self.view.backgroundColor = [UIColor grayColor];
    
    _price = [[PriceView alloc] initWithFrame:CGRectZero];
    [self.view addSubview:_price];
    
    _invalidateLayoutTimer = [NSTimer scheduledTimerWithTimeInterval:1 target:self selector:@selector(invalidatePriceViewLayout) userInfo:nil repeats:YES];
}

- (void)viewDidLayoutSubviews
{
    [super viewDidLayoutSubviews];
    
    [_price setFrame:CGRectMake(0, 100, self.view.bounds.size.width, 50)];
}

- (void)invalidatePriceViewLayout
{
    [UIView animateWithDuration:0.25 animations:^{
        
        [_price setFrame:CGRectMake(0, 100, self.view.bounds.size.width - arc4random_uniform(40), 50 + arc4random_uniform(10))];
        
    }];
}

@end
